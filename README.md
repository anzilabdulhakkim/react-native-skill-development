# React Native Setup Guide - 2025 Edition

This guide covers the essential setup for React Native using Expo, focusing on the environment configuration and the core differences between React Web and React Native.

---

## Part 1: The Gear (Environment Setup)

### 1. Node.js (LTS)
React Native runs on Node.
* **Action:** Go to the Node.js site and grab the **LTS version** (v20.x or v22.x).
* **Verify:**
    ```bash
    node -v
    ```

### 2. Java Development Kit (JDK 17)
Android needs Java to build. JDK 17 is the standard version.
* **Download:** [Adoptium OpenJDK 17 (Temurin)](https://adoptium.net/)
* **⚠️ CRITICAL STEP:** When installing, ensure you tick the box that says **"Set JAVA_HOME variable"** or **"Add to PATH"**. Do not skip this, or Android Studio won't find Java.
* **Verify:**
    ```bash
    java -version
    ```

### 3. Android Studio (The Heavy Lifter)
Required to simulate an Android phone on the computer.
* **Download:** Install Android Studio and keep all default settings (ensure "Android Virtual Device" is checked).
* **Setup SDK:**
    1. Open Studio -> **More Actions** (three dots) -> **SDK Manager**.
    2. **SDK Platforms Tab:** Check "Android 14.0" (or latest stable).
    3. **SDK Tools Tab:** Check "Android SDK Build-Tools" & "Android SDK Platform-Tools".
    4. Hit Apply/OK.
* **Windows Env Variable (Only if on Windows):**
    * Search "Edit the system environment variables".
    * Add a User Variable named `ANDROID_HOME`.
    * Value: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
* **Create the Emulator:**
    * Go to **Virtual Device Manager**.
    * Create Device -> Select a generic phone (like Pixel 7).
    * Select a system image (e.g., UpsideDownCake) and download it.
    * Hit Play to launch the phone.

---

## Part 2: VS Code Config

Install these extensions for a better workflow:
1.  **ES7+ React/Redux/React-Native snippets** (by dsznajder)
    * *Why:* Type `rnfe` and hit tab to create a full component instantly.
2.  **Prettier**
    * *Why:* Clean formatting automatically.

---

## Part 3: Start a Project

No global installs needed. Use `npx`.

1.  **Create the app:**
    ```bash
    npx create-expo-app@latest (name of the app)
    ```
2.  **Go inside:**
    ```bash
    cd (name of the app)
    ```
3.  **Run it:**
    ```bash
    npx expo start
    ```
4.  **Launch on Android:**
    * Make sure your Emulator is running from Part 1.
    * Press `a` in the terminal.
    * *Result:* App should pop up on the virtual screen.

---

## Part 4: The "Native" Mindset (Web vs Native)

A translation guide from HTML to React Native components.

| Concept | React Web (HTML) | React Native | The "Gotchas" |
| :--- | :--- | :--- | :--- |
| **Container** | `<div>`, `<section>` | `<View>` | It's a box. It does **not** scroll by default. |
| **Text** | `<p>`, `<h1>`, `<span>` | `<Text>` | **Strict Rule:** All strings must be inside `<Text>`. You cannot put text directly into a `<View>` or the app will crash. |
| **Button** | `<button>` | `<Pressable>` | RN has a `Button` component but it's limited. Use `Pressable` or `TouchableOpacity` to make custom buttons. |
| **Input** | `<input>` | `<TextInput>` | It's self-closing. |
| **Scrolling** | CSS `overflow: scroll` | `<ScrollView>` | If content overflows the screen, you **must** wrap it in a ScrollView (or FlatList for data arrays). |
| **Clicking** | `onClick` | `onPress` | No clicks on mobile, only presses! |
| **Styling** | CSS / className | `style={{}}` | No CSS files. It uses JavaScript objects that look like CSS. |

---

## Part 5: Architectural Decision: Why Expo?

We have selected **Expo (Managed Workflow with Prebuild)** over the bare React Native CLI. This decision drives efficient delivery in a startup environment.

### Rationale

#### 1. Cross-Platform Build Infrastructure
- **Problem:** The CLI requires a macOS environment to build iOS binaries (`.ipa`).
- **Solution:** Expo Application Services (EAS) allows us to build iOS artifacts via the cloud, enabling Windows-based developers to deploy iOS applications without hardware constraints.

#### 2. Environment Management
- **Problem:** Native CLI requires manual configuration of Xcode, CocoaPods, and Gradle. Version mismatches frequently cause build failures.
- **Solution:** Expo abstracts the native build pipeline. We configure the app via `app.json`, and the native folders (`android/`, `ios/`) are generated deterministically on build ("Prebuild" pattern).

#### 3. Continuous Deployment & OTA Updates
- **Problem:** Critical bug fixes via CLI require a full App Store review cycle (24-48 hours).
- **Solution:** Expo supports Over-The-Air (OTA) updates. JavaScript bundles can be hot-patched to user devices immediately, bypassing the store review process for non-native code changes.

#### 4. Upgrade Maintainability
- **Problem:** Upgrading React Native versions in a CLI project involves complex manual diffing of native files.
- **Solution:** Expo manages the upgrade process. Updating the SDK version in `package.json` automates the necessary native dependency updates.
  
