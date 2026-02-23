package com.brightsdk.bridge.capacitor;

import com.getcapacitor.Logger;

public class BrightSdkBridge {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
