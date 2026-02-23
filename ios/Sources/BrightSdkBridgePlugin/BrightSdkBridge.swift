import Foundation

@objc public class BrightSdkBridge: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
