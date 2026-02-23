import { BrightSdkBridge } from 'capacitor-bright-sdk-bridge';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    BrightSdkBridge.echo({ value: inputValue })
}
