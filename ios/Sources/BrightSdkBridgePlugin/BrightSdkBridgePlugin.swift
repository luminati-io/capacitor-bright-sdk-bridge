import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(BrightSdkBridgePlugin)
public class BrightSdkBridgePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BrightSdkBridgePlugin"
    public let jsName = "BrightSdkBridge"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = BrightSdkBridge()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
