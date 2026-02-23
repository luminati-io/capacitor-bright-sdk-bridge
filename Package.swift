// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorBrightSdkBridge",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorBrightSdkBridge",
            targets: ["BrightSdkBridgePlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "BrightSdkBridgePlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .target(name: "brdsdk"),
            ],
            path: "ios/Sources/BrightSdkBridgePlugin"),
        .binaryTarget(name: "brdsdk",
                      url: "https://cdn.bright-sdk.com/static/bright_sdk_ios-1.605.415.zip",
                      checksum: "51c8b861c87a248507a17480923fdec30d68fcfbee6f3faecab44525f4a07e9b"),
    ]
)
