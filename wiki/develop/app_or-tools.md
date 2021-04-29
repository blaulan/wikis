---
layout: default
parent: Apps
nav_order: 255
nav_exclude: true
title: How to Compile OR-Tools
author: Yue Wu <me@blaulan.com>
created:  2020-08-18 20:49:47
modified: 2020-08-27 20:25:05
tags: [app, work]
---

## 编译 OR-Tools [^1]

1. 获取[源码](https://github.com/google/or-tools)，切换到 tag `release-2015-09`
2. 安装 Visual Studio Community 2019，以及以下 workloads：
    - .Net desktop development
    - Desktop development with C++
    - Git for Windows
3. `src`, `examples` 目录下所有 `.cc` 文件文件头添加[^2]：
```cpp
#define _SILENCE_STDEXT_HASH_DEPRECATION_WARNINGS 1
```
4. 从 VS 启动 Developer Command Prompt，切换到 or-tools 目录，运行
```batch
tools\make third_party
```
1. 下载 [zlib](https://ayera.dl.sourceforge.net/project/libpng/zlib/1.2.8/zlib128.zip)、[swigwin](https://svwh.dl.sourceforge.net/project/swig/swigwin/swigwin-3.0.7/swigwin-3.0.7.zip)，放到 `dependencies\archives` 目录
2. 下载 coin-or，放到 `dependencies\sources` 目录
    - 运行 `svc co https://projects.coin-or.org/svn/Cbc/releases/2.9.5/ cbc-2.9.5`
    - 注释掉 `makefiles/Makefile.third_party.win:352`，替换 `$(CBC_PLATFORM)`
3. 编译 gflags 的时候如果报 "already has a body" 错误，修改 `dependencies\sources\gflags-2.1.2\src\windows_port.cc`，移除 snprintf 函数[^3]
4. 编译 protobuf 的时候如果报 "\<hash_map\> is deprecated and will be REMOVED." 错误，在引用 `hash_map` 的文件头添加：
```cpp
#define _SILENCE_STDEXT_HASH_DEPRECATION_WARNINGS 1
```
1. 编译 coin-or 的时候如果报 Visual Studio 版本错误，[编译 CBC](#编译-cbc)
2. 第三方依赖编译完毕后运行
```batch
tools\make cc
tools\make csharp
```

## 编译 CBC

1. 打开 `cbc-2.9.5/Cbc/MSVisualStudio/v10/Cbc.sln` 更新版本，切换到 x64 平台
2. 下载 [pthread](ftp://sourceware.org/pub/pthreads-win32/dll-latest)，在 `pthread.h` 头部添加 `#define HAVE_STRUCT_TIMESPEC`
3. 拷贝文件[^4]：
    - Add the header files: `pthread.h`, `sched.h`, `semaphore.h` to the libCbc headers
    - Add the library `pThreadVSE2.lib` to the subproject libCbc
    - Add at the top of the source of `CbcModel.h`: `#define CBC_THREAD 1`
    - The dll `pThreadVSE2.dll` should be placed in the same folder as `cbc.exe`

### CBC on Arm

```bash
git config --global url."git://".insteadof https://
find . -path "*/config.guess" -print | xargs -I @ cp ../config.guess @
find . -path "*/config.sub" -print | xargs -I @ cp ../config.sub @

# https://github.com/coin-or/Cbc
wget https://raw.githubusercontent.com/coin-or/coinbrew/master/coinbrew
./coinbrew fetch Cbc:stable/2.10 --verbosity=2 --no-prompt
./coinbrew build Cbc --verbosity=2 --test --no-prompt
```

## 参考资料

[^1]: [Install OR-Tools .Net from Source on Windows](https://developers.google.com/optimization/install/dotnet/source_windows)
[^2]: [How to fix “\<hash_map\> is deprecated”?](https://stackoverflow.com/a/30811901)
[^3]: [VS2015 Compile Error #146](https://github.com/gflags/gflags/issues/146)
[^4]: [multithreaded cbc for windows](https://list.coin-or.org/pipermail/cbc/2012-October/000894.html)
[^5]: [Add parameter passing to the CBC interface](https://github.com/yingzong/or-tools/commit/32e1e9e7376abe0ba9c40c52ad4a09181f2141b7)
[^6]: [Compile from source C# generates a DLL specified AnyCPU but is in fact x86](https://groups.google.com/g/or-tools-discuss/c/Z1z0LvgHGP8/m/Ojvwjg0_AAAJ)
[^7]: [Error C2011 'timespec': 'struct' type redefinition](https://stackoverflow.com/q/33557506)
[^8]: [#45 Cbc multithreading support for Windows](https://projects.coin-or.org/Cbc/ticket/45#no2)
