---
layout: default
parent: Apps
nav_order: 255
nav_exclude: true
title: Visual Basic the Right Way
author: Yue Wu <me@blaulan.com>
created:  2020-08-26 14:19:43
modified: 2020-08-27 20:25:05
tags: [app]
---

### Automatically Fill Data

`AutoFill2Date.vb`

```vb
Sub loop_through_all_worksheets()

    ' prepare some variables
    Dim sheet As Worksheet
    Dim last_row As Long
    Dim last_column As Long
    Dim days_between As Integer
    Dim delete_count As Integer

    ' remember the initial sheet
    Dim initial As Worksheet
    Set initial = ActiveSheet

    ' loop over each sheet
    For Each sheet In ThisWorkbook.Worksheets
        sheet.Activate
        If sheet.CodeName = "Sheet1" Then
            Debug.Print "skip first sheet"
        Else
            last_row = sheet.Cells(sheet.Rows.count, "A").End(xlUp).Row
            last_column = sheet.Cells(last_row, sheet.Columns.count).End(xlToLeft).Column
            days_between = DateDiff("d", sheet.Cells(last_row, 1).Value, Now())
            If days_between > 0 Then
                Debug.Print "adding ", days_between, " days"
                Set sour = sheet.Range(sheet.Cells(last_row, 1), sheet.Cells(last_row, last_column))
                Set dest = sheet.Range(sheet.Cells(last_row, 1), sheet.Cells(last_row + days_between, last_column))
                sour.AutoFill Destination:=dest
                delete_count = 0
                For i = 1 To days_between
                    If sheet.Cells(last_row + i - delete_count, 1).Value < sheet.Cells(last_row, 1).Value Then
                        sheet.Rows(last_row + i - delete_count).Delete
                        delete_count = delete_count + 1
                    End If
                Next i
            End If
            Exit For
        End If
    Next

    initial.Activate

End Sub
```

### A Basic Timer in Excel

`clsTimer.cls`

```vb
VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "clsTimer"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Public StartTime As Date
Public Cell As Range
```

`Timer.bas`

```vb
Attribute VB_Name = "Timer"
Private mTimers As Collection
Private mNextTime As Date

Public Sub UpdateTimers()

   Dim Timer As clsTimer

   If mTimers Is Nothing Then
      On Error Resume Next
      Application.OnTime mNextTime, "UpdateTimers", Schedule:=False
      On Error GoTo 0
      mNextTime = 0
   Else
      For Each Timer In mTimers
         Timer.Cell = (Now - Timer.StartTime)
      Next Timer
      mNextTime = Now + (1 - (Int(Now() * 86400) - Now() * 86400)) / 86400
      Application.OnTime mNextTime, "UpdateTimers"
   End If

End Sub

Public Sub StartTimer( _
      ByVal TargetCell As Range _
   )
   
   Dim Timer As clsTimer
   
   If mTimers Is Nothing Then
      Set mTimers = New Collection
   End If
   
   On Error Resume Next
   Set Timer = mTimers(TargetCell.Address)
   On Error GoTo 0
   
   If Timer Is Nothing Then
      Set Timer = New clsTimer
      Set Timer.Cell = TargetCell
      Timer.StartTime = Now
      mTimers.Add Timer, TargetCell.Address
   End If
   Timer.StartTime = Now
   If mNextTime = 0 Then
      UpdateTimers
   End If
   
End Sub

Public Sub StopTimer( _
      ByVal TargetCell As Range _
   )
   
   Dim Timer As clsTimer
   Dim Index As Long
   
   If mTimers Is Nothing Then
      Exit Sub
   End If
   
   On Error Resume Next
   Set Timer = mTimers(TargetCell.Address)
   On Error GoTo 0
   
   If Not Timer Is Nothing Then
      For Index = 1 To mTimers.Count
         If mTimers(Index).Cell.Address = TargetCell.Address Then
            mTimers.Remove (Index)
            Exit For
         End If
      Next Index
   End If
   
   If mTimers.Count = 0 Then
      Set mTimers = Nothing
   End If
   
End Sub

Public Sub StartButton()
  ActiveCell.NumberFormat = "[s]"
  StartTimer ActiveCell
End Sub

Public Sub StopButton()
  StopTimer ActiveCell
End Sub
```
