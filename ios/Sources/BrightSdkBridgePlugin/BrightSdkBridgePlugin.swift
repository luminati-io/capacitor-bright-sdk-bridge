import Foundation
import Capacitor
import brdsdk

@objc(BrightSdkBridgePlugin)
public class BrightSdkBridgePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BrightSdkBridgePlugin"
    public let jsName = "BrightSdkBridge"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "currentChoice", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "version", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "uuid", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "optOut", returnType: CAPPluginReturnNone),
        CAPPluginMethod(name: "showConsent", returnType: CAPPluginReturnPromise),
    ]

    public override init() {
        try! brd_api(skip_consent: true)

        super.init()

        brd_api.onChoiceChange = { [weak self] choice in
            self?.notifyListeners("onChoiceChange", data: ["value": choice.rawValue])
        }
    }

    @objc
    func currentChoice(_ call: CAPPluginCall) {
        call.resolve([
            "value": brd_api.currentChoice.rawValue,
        ])
    }

    @objc
    func version(_ call: CAPPluginCall) {
        call.resolve([
            "value": brd_api.sdkVersion,
        ])
    }

    @objc
    func uuid(_ call: CAPPluginCall) {
        call.resolve([
            "value": brd_api.get_uuid(),
        ])
    }

    @objc
    func optOut(_ call: CAPPluginCall) {
        brd_api.optOut(from: .manual)
        call.resolve()
    }

    @objc
    func showConsent(_ call: CAPPluginCall) {
        let benefit = call.getString("benefit")
        let agreeBtn = call.getString("agree_btn")
        let disagreeBtn = call.getString("disagree_btn")
        let language = call.getString("language")

        DispatchQueue.main.async { [weak self] in
            let shown = brd_api.show_consent(nil, benefit: benefit,
                                             agree_btn: agreeBtn, disagree_btn: disagreeBtn,
                                             language: language)
            call.resolve([
                "value": shown
            ])
        }
    }
}
