---
layout: default
parent: Server
nav_order: 255
nav_exclude: true
title: Batch Snippets
author: Yue Wu <me@blaulan.com>
created:  2019-08-23 00:00:00
modified: 2020-08-27 20:25:05
tags: [server]
---

## PowerShell

### backup folder

```powershell
$orig = "[PATH TO PARENT FOLDER]"
$dest = "[PATH TO DESTINATION FOLDER]"
$folders = "LIST","OF","FOLDERS","TO","SYNC"

If (!(Test-Path $dest)) {
    Echo "Can't find destination folder $dest."
    Exit
}

ForEach ($f In $folders) {
    $dir = Split-Path "$orig\$f" -Leaf

    Echo "$orig\$f => $dest\$dir"
    Robocopy "$orig\$f" "$dest\$dir" /mir /r:0 /w:0 /NFL /NDL /nc /ns /np /max:104857600 | Select -Last 13
}
```

### dump from database

```powershell
param (
    [string]$Server = "",
    [string]$Database = "",
    [string]$QueryFile = "",
    [string]$QueryString = "SELECT [name] FROM sys.tables WITH (NOLOCK) ORDER BY [name]",
    [string]$OutputFile = "SQLQueryOutput.txt"
)

if ($QueryFile) {
  $QueryString = (Get-Content $QueryFile) -Join "`n"
}

# get headers and content
Write-Output $QueryString
$HeaderQury = "SELECT name FROM sys.dm_exec_describe_first_result_set('" + $QueryString.Replace("'", "''") + "', NULL, 0);"
bcp "$HeaderQury" queryout "temp_headers.txt" -T -S "$Server" -d "$Database" -c
bcp "$QueryString" queryout "temp_output.txt" -T -S "$Server" -d "$Database" -c

# merge temp files
(Get-Content temp_headers.txt) -Join "`t" | Set-Content -path "$OutputFile"
Get-Content temp_output.txt | Add-Content -path "$OutputFile"

# remove temp files
Remove-Item temp_headers.txt, temp_output.txt
```

### customize prompt

```powershell
function Prompt {
  Write-Host ("[") -nonewline -foregroundcolor DarkGray
  Write-Host $env:username -nonewline -foregroundcolor Gray
  Write-Host ("][") -nonewline -foregroundcolor DarkGray
  Write-Host (Get-Date -format HH:mm:ss) -nonewline -foregroundcolor Gray
  Write-Host ("][") -nonewline -foregroundcolor DarkGray
  Write-Host (Split-Path -leaf -path (Get-Location)) -nonewline -foregroundcolor Gray
  Write-Host ("][") -nonewline -foregroundcolor DarkGray
  Write-Host $env:Conda -nonewline -foregroundcolor Red
  Write-Host ("] ") -nonewline -foregroundcolor DarkGray
  Write-Host ("#") -nonewline -foregroundcolor Green
  return " ";
}

# some useful alias
function which($name) { Get-Command $name | Select-Object -ExpandProperty Definition }
function uptime {
  $os = Get-WmiObject win32_operatingsystem
  $uptime = (Get-Date)-($os.ConvertToDateTime($os.lastbootuptime))
  $Display = "Uptime: "+$Uptime.Days+" days, "+$Uptime.Hours+" hours, "+$Uptime.Minutes+" minutes" 
  Write-Output $Display
}
```

## [AutoHotKey](https://gist.github.com/blaulan/9dd56038c509ed8e91bbd4e3e63d1fb6)

- Send Clipboard
```
!v::
SendInput {Raw}%clipboard%
Return
```

- Always On Top
```
!a::
WinGet, CurrentWindow, ID, A
WinGet, ExStyle, ExStyle, ahk_id %CurrentWindow%
If (ExStyle & 0x8){
    Winset, AlwaysOnTop, off, ahk_id %CurrentWindow%
    SplashImage, , x0 y0 b fs12, Always On Top OFF.
    Sleep, 1500
    SplashImage, Off
}
Else {
    WinSet, AlwaysOnTop, on, ahk_id %CurrentWindow%
    SplashImage, ,x0 y0 b fs12, Always On Top ON.
    Sleep, 1500
    SplashImage, Off
}
Return
```
