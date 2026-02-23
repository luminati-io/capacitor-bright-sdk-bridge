import '../style.css'
import { BrightSdkBridge } from 'capacitor-bright-sdk-bridge';

const versionEl = document.querySelector('#sdk-version');
const uuidEl = document.querySelector('#sdk-uuid');
const choiceEl = document.querySelector('#sdk-current-choice');
const showConsentBtn = document.querySelector('#show-consent-btn');
const optOutBtn = document.querySelector('#optout-btn');

function handleChoice(choice) {
  choiceEl.textContent = choice;
  if (choice == 1) {
    showConsentBtn.style.display = 'none';
    optOutBtn.style.display = '';
  } else {
    showConsentBtn.style.display = '';
    optOutBtn.style.display = 'none';
  }
}

BrightSdkBridge.addListener('onChoiceChange', (event) => {
  handleChoice(event.value);
});

showConsentBtn.addEventListener('click', async () => {
  await BrightSdkBridge.showConsent({
    benefit: 'Demo benefit',
  });
});

optOutBtn.addEventListener('click', async () => {
  BrightSdkBridge.optOut();
});

const {value: choice} = await BrightSdkBridge.currentChoice();
const {value: version} = await BrightSdkBridge.version();
const {value: uuid} = await BrightSdkBridge.uuid();
versionEl.textContent = version;
uuidEl.textContent = uuid;
handleChoice(choice);