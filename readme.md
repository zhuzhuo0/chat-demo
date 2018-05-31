vscode 发布新分支
web运行 ionic serve
添加android平台 ionic cordova platform add android 
添加指定版本android平台 ionic cordova platform add android@7.0
cordova-plugin-file-opener2 插件安装 cordova plugin add https://github.com/pwlin/cordova-plugin-file-opener2.git
需要打开apk包需要在plugins/cordova-plugin-file-opener2中添加
<platform name="android">
    <config-file parent="/manifest" target="AndroidManifest.xml" xmlns:android="http://schemas.android.com/apk/res/android">
        <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
    </config-file>
</platform>
cordova run android运行
cordova-plugin-file-opener2 plugin 34行 <framework src="com.android.support:support-v4:24.1.1+" />