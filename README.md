<h2 align="center">@good/cli</h2>

<p align="center">A Vue、React template CLI.</p>

<p align="center">
<img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="Build Status">
<img src="https://img.shields.io/github/package-json/v/chenjiajing23/good-apis?style=flat-square&color=orange" alt="Version">
<img src="https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square&color=blue" alt="MIT">
<img alt="npm" src="https://img.shields.io/npm/dt/good-apis?style=flat-square&color=red" alt="downloads">
</p>

# Installation

```
$ npm i @good/cli -g
```

# Usage

Run the following command line to create the project:

```
$ good-cli init my-project-name
```

# Parameter

## init <PROJECT_NAME>

Create the JavaScript plugin project:

```
$ good-cli init my-project-name
```

## upgrade

Check the new version is available or not:

```
$ good-cli upgrade
```

## template

You can download or upgrade the template from mirror:

```
$ good-cli template
```

## mirror <TEMPLATE_MIRROR>

You can also set the template mirror like this:

```
$ good-cli mirror https://github.com/chenjiajing23/react-template-pc/archive/master.zip
```

or（There is no.zip suffix）

```
good-cli mirror https://github.com/chenjiajing23/react-template-pc/archive/master
```

**NOTE**
You can customize the template mirror link by youself, but the template file name must be `.zip`, and the mirror link should be `.zip` ending.
For example, the full link to your custom template mirror is `https://github.com/chenjiajing23/react-template-pc/archive/master.zip`, the mirror link that good-cli can recognize should be `https://github.com/chenjiajing23/react-template-pc/archive/master.zip` or `https://github.com/chenjiajing23/react-template-pc/archive/master`.

You can download the good-cli template from [react-template-pc](https://github.com/chenjiajing23/react-template-pc/archive/master.zip).
