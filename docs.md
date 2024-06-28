# Basic React Native App

## Commands

- init expo with typescript: `npx create-expo-app --template blank-typescript workout-app`
- install web packages: `npx expo install react-native-web react-dom @expo/metro-runtime`
- start with options: `yarn start`
- install react native navigation: `yarn add @react-navigation/native @react-navigation/native-stack`
- install extra navigation packages: `npx expo install react-native-screens react-native-safe-area-context`
- install bottom tabs: `yarn add @react-navigation/bottom-tabs`
- install latest expo icons: `yarn add @expo/vector-icons`
  - search for app icons: <https://icons.expo.fyi/Index>
- install fonts: <https://fonts.google.com/>
  - i.e. Montserrat: <https://fonts.google.com/specimen/Montserrat?preview.layout=grid&query=montserrat>
- install module to handle local storage: `@react-native-async-storage/async-storage`
- how to react native hook form: <https://react-hook-form.com/> | <https://react-hook-form.com/get-started#ReactNative>
- install react native hook form: `yarn add react-hook-form`
- slugify a string: `yarn add slugify`
- install safe area context (handle devices status bar not usable area, etc): `yarn add react-native-safe-area-context`
- install react native screens (for production deploy): `yarn add react-native-screens`
- test app with expo: <https://expo.dev/tools>
  - sign up and login
  - install expo EAS (Expo Application Services) globally: `npm install -g eas-cli`
  - run `eas login` and login with expo account credentials
  - run `eas whoami` to check if you are logged in
- build the app: <https://docs.expo.dev/build/setup/>
  - configure: `eas build:configure`
    - choose default options (create project and ALL platforms)
    - for Android build:
      - add the settings for android into `eas.json` file (i.e. `previewAndroid` profile)
      - build for for android preview: `eas build -p android --profile previewAndroid`
    - for IOS build:
      - add the settings for IOS into `eas.json` file (i.e. `previewIos` profile)
      - build for for IOS preview: `eas build -p ios --profile previewIos`
