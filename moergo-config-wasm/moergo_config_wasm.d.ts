/* tslint:disable */
/* eslint-disable */
/**
 * A KeyAction is the action at a keyboard position, stored in keymap.
 * It can be a single action like triggering a key, or a composite keyboard action like tap/hold
 */
export type KeyAction = "No" | "Transparent" | { Single: Action } | { Tap: Action } | { TapHold: [Action, Action, number] } | { Morse: number } | { LayerModTap: [number, ModifierKey, HidKeyCode] };

/**
 * A bounded, self-describing value in a board-defined device-data schema.
 *
 * Hosts can project this enum to JSON without knowing the board at compile
 * time. Stable meanings belong to the descriptor\'s namespace and schema
 * version, rather than to RMK\'s core protocol.
 */
export type DeviceDataValue = { Bool: boolean } | { Unsigned: number } | { Signed: number } | { Text: string };

/**
 * A decoded topic push (server → host), one variant per row of the
 * topic table above — generated from it. `Serialize` lets the host
 * re-emit a decoded topic as JSON (every payload is already a wire type).
 */
export type TopicEvent = { LayerChange: number } | { WpmUpdate: number } | { ConnectionChange: ConnectionStatus } | { SleepState: boolean } | { LedIndicatorChange: LedIndicator } | { BatteryStatusChange: BatteryStatus } | { LightingChange: LightingChanged } | { ModifierChange: ModifierCombination };

/**
 * A gesture a touchpad recognizes. Each has its own action per layer in the touch
 * map.
 */
export type TouchGesture = "Tap" | "TwoFingerTap" | "ThreeFingerTap";

/**
 * A key\'s outline rectangle in key-units.
 */
export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

/**
 * A parsed document together with the format it turned out to be, and whatever
 * the parse had to say about it.
 */
export interface ParsedConfig {
    format: ConfigFormat;
    snapshot: RuntimeSnapshot;
    /**
     * Bindings that did not survive the trip exactly. Empty for a TOML
     * document, which describes the managed state directly and so has nothing
     * to approximate; an editor export is where a layout meets a keyboard that
     * expresses things differently.
     *
     * A parse that returns these still succeeded. They are the difference
     * between what the export asked for and what the keyboard will do, and
     * dropping them on the floor is how an import comes to look lossless when
     * it was not.
     */
    notes: ImportNote[];
}

/**
 * A physical key in the keyboard\'s unified matrix.
 *
 * Split peripherals apply their configured row/column offsets before events
 * reach combo processing, so these coordinates address the complete keyboard.
 */
export interface MatrixPosition {
    row: number;
    col: number;
}

/**
 * A single basic action that a keyboard can execute.
 */
export type Action = "No" | { Key: KeyCode } | { Modifier: ModifierCombination } | { KeyWithModifier: [HidKeyCode, ModifierCombination] } | { LayerOn: number } | { LayerOnWithModifier: [number, ModifierCombination] } | { LayerOff: number } | { LayerToggle: number } | { DefaultLayer: number } | { LayerToggleOnly: number } | "TriLayerLower" | "TriLayerUpper" | { TriggerMacro: number } | { OneShotLayer: number } | { OneShotModifier: ModifierCombination } | { OneShotKey: HidKeyCode } | { Light: LightAction } | { KeyboardControl: KeyboardAction } | { Special: SpecialKey } | { User: number } | { PersistentDefaultLayer: number } | { Unicode: number } | { Steno: StenoKey };

/**
 * A single steno key, identified by its position (0..=63) in the canonical
 * Plover HID key chart. See module docs for the full list.
 *
 * Variants are declared in chart order with matching discriminants, keeping
 * serde\'s ordinal encoding byte-identical to a plain `u8` chart index, one
 * postcard varint byte per key.
 */
export type StenoKey = "S1" | "T" | "K" | "P" | "W" | "H" | "R" | "A" | "O" | "STAR1" | "RE" | "RU" | "RF" | "RR" | "RP" | "RB" | "RL" | "RG" | "RT" | "RS" | "RD" | "RZ" | "NUM1" | "S2" | "STAR2" | "STAR3" | "STAR4" | "NUM2" | "NUM3" | "NUM4" | "NUM5" | "NUM6" | "NUM7" | "NUM8" | "NUM9" | "NUMA" | "NUMB" | "NUMC" | "X1" | "X2" | "X3" | "X4" | "X5" | "X6" | "X7" | "X8" | "X9" | "X10" | "X11" | "X12" | "X13" | "X14" | "X15" | "X16" | "X17" | "X18" | "X19" | "X20" | "X21" | "X22" | "X23" | "X24" | "X25" | "X26";

/**
 * A write that only lands if the host\'s `revision` still matches.
 */
export interface SetPointingConfigRequest {
    config: PointingConfig;
}

/**
 * Action for a rotary encoder position, stored in the encoder map.
 *
 * Both fields default to `KeyAction::No` (no action).
 */
export interface EncoderAction {
    /**
     * Action triggered when the encoder is rotated clockwise.
     */
    clockwise: KeyAction;
    /**
     * Action triggered when the encoder is rotated counter-clockwise.
     */
    counter_clockwise: KeyAction;
}

/**
 * Actions for controlling lights.
 *
 * Not implemented yet: the firmware accepts these in the keymap but ignores
 * them when pressed.
 */
export type LightAction = "BacklightOn" | "BacklightOff" | "BacklightToggle" | "BacklightDown" | "BacklightUp" | "BacklightStep" | "BacklightToggleBreathing" | "RgbTog" | "RgbModeForward" | "RgbModeReverse" | "RgbHui" | "RgbHud" | "RgbSai" | "RgbSad" | "RgbVai" | "RgbVad" | "RgbSpi" | "RgbSpd" | "RgbModePlain" | "RgbModeBreathe" | "RgbModeRainbow" | "RgbModeSwirl" | "RgbModeSnake" | "RgbModeKnight" | "RgbModeXmas" | "RgbModeGradient" | "RgbModeRgbtest" | "RgbModeTwinkle" | "OutputModeCycle";

/**
 * Actions for controlling the keyboard or changing the keyboard\'s state, for example, enable/disable a particular function
 */
export type KeyboardAction = "Bootloader" | "Reboot" | "ClearEeprom" | "ComboOn" | "ComboOff" | "ComboToggle" | "CapsWordToggle" | "OutputUsb" | "OutputBluetooth" | "UnicodeModeCycle" | "MaintenanceModeToggle" | "CtrlGuiSwapToggle";

/**
 * Active-mode split BLE latency policy. Values count connection events.
 */
export interface SplitCentralLatencyPolicy {
    /**
     * Maximum skipped connection events when USB power is present.
     */
    powered: number;
    /**
     * Maximum skipped connection events when running on battery.
     */
    battery: number;
    /**
     * Forced value for both power states; `None` restores automatic selection.
     */
    override_latency: number | undefined;
}

/**
 * Atomic replacement payload for the complete auto mouse layer table.
 */
export interface SetAutoMouseLayerConfigsRequest {
    configs: AutoMouseLayerConfig[];
}

/**
 * Atomic replacement payload for the runtime hold-trigger table.
 */
export interface SetMorseHoldTriggerPositionsRequest {
    positions: MorseHoldTriggerPosition[];
}

/**
 * Authoritative snapshot of every layer participating in key resolution.
 *
 * RMK stores the default layer separately from its mutable layer mask. The
 * corresponding bit in `active_bitmap` is nevertheless always set by the
 * firmware so callers can treat this as the complete active set. Bit `n`
 * reports layer `n`, least-significant bit first within each byte.
 */
export interface LayerState {
    default_layer: number;
    active_bitmap: number[];
}

/**
 * Battery status used for both status queries and event notifications.
 */
export type BatteryStatus = "Unavailable" | { Available: { charge_state: ChargeState; level: number | undefined } };

/**
 * Bitset state used by fork matching logic.
 *
 * A zero (default) value means \"match nothing\" — no modifiers, LEDs, or mouse buttons.
 */
export interface StateBits {
    /**
     * Active modifier combination to match.
     */
    modifiers: ModifierCombination;
    /**
     * LED indicator state to match (Num/Caps/Scroll Lock, etc.).
     */
    leds: LedIndicator;
    /**
     * Mouse button state to match.
     */
    mouse: MouseButtons;
}

/**
 * Bulk request payload for `SetComboBulk`: write `configs` starting at slot
 * `start_index`.
 */
export interface SetComboBulkRequest {
    start_index: number;
    configs: Combo[];
}

/**
 * Bulk request payload for `SetMorseBulk`: write `configs` starting at slot
 * `start_index`.
 */
export interface SetMorseBulkRequest {
    start_index: number;
    configs: Morse[];
}

/**
 * Bulk request payload for `SetMorseProfileBulk`: write `profiles` into
 * consecutive slots starting at `start_index`.
 */
export interface SetMorseProfileBulkRequest {
    start_index: number;
    profiles: MorseProfile[];
}

/**
 * Bulk response containing action- or position-based combo definitions.
 */
export interface GetComboDefinitionBulkResponse {
    definitions: ComboDefinition[];
}

/**
 * Bulk response for getting multiple combos at once.
 */
export interface GetComboBulkResponse {
    configs: Combo[];
}

/**
 * Bulk response for getting multiple key actions at once.
 */
export interface GetKeymapBulkResponse {
    actions: KeyAction[];
}

/**
 * Bulk response for getting multiple morse configs at once.
 */
export interface GetMorseBulkResponse {
    configs: Morse[];
}

/**
 * Bulk response for reading multiple morse profiles at once.
 */
export interface GetMorseProfileBulkResponse {
    profiles: MorseProfile[];
}

/**
 * Bulk write of versioned combo definitions.
 */
export interface SetComboDefinitionBulkRequest {
    start_index: number;
    definitions: ComboDefinition[];
}

/**
 * Charge state of the battery.
 */
export type ChargeState = "Charging" | "Discharging" | "Unknown";

/**
 * Configuration data for a combo triggered by physical matrix positions.
 *
 * Unlike [`Combo`], matching is independent of the actions currently resolved
 * at those positions. This makes the trigger stable across keymap and layer
 * changes and lets two positions carrying the same action participate in one
 * combo.
 */
export interface PositionCombo {
    positions: MatrixPosition[];
    output: KeyAction;
    /**
     * Bitmask of layers the combo is valid on. `u32::MAX` means all layers.
     */
    layers: number;
}

/**
 * Configuration data for a combo.
 *
 * A combo triggers an output action when a set of keys are pressed simultaneously.
 * The maximum number of trigger keys is determined by `COMBO_SIZE` (from `constants.rs`,
 * generated at build time from `keyboard.toml` on firmware or fixed upper bound on host).
 * Actions are stored in a Vec — only meaningful keys are present (no `KeyAction::No` padding).
 *
 * Note: `COMBO_SIZE` is a **wire-format** capacity — on firmware it equals
 * `MAX_COMBO_KEYS` (from `keyboard.toml`), on host it\'s a fixed upper bound.
 */
export interface Combo {
    actions: KeyAction[];
    output: KeyAction;
    /**
     * Bitmask of layers the combo is valid on. `u32::MAX` means all layers.
     */
    layers: number;
}

/**
 * Configuration for caret mode
 */
export interface CaretConfig {
    /**
     * Disable X axis in caret mode.
     */
    disable_x: boolean;
    /**
     * Disable y axis in caret mode.
     */
    disable_y: boolean;
    /**
     * Invert X axis.
     */
    invert_x: boolean;
    /**
     * Invert Y axis.
     */
    invert_y: boolean;
    /**
     * Threshold for accumulated motion. Read this as sensitivity in caret mode.
     * Higher values mean less sensitivity.
     */
    threshold: number;
    /**
     * Keycode to emit for up rotation. Default: Up arrow
     */
    keycode_up: HidKeyCode;
    /**
     * Keycode to emit for down rotation. Default: Down arrow
     */
    keycode_down: HidKeyCode;
    /**
     * Keycode to emit for left rotation. Default: Left arrow
     */
    keycode_left: HidKeyCode;
    /**
     * Keycode to emit for right rotation. Default: Right arrow
     */
    keycode_right: HidKeyCode;
}

/**
 * Configuration for cursor mode
 */
export interface CursorConfig {
    /**
     * Multiplier for X axis. Higher = more output per unit of motion. 0 disables X.
     */
    multiplier_x: number;
    /**
     * Multiplier for Y axis. Higher = more output per unit of motion. 0 disables Y.
     */
    multiplier_y: number;
    /**
     * Divisor for X axis, so the cursor can be slower than the sensor, e.g. 2/3 with
     * `multiplier_x: 2, divisor_x: 3`. Fractions carry over to the next motion. 0
     * disables X.
     */
    divisor_x: number;
    /**
     * Divisor for Y axis. 0 disables Y.
     */
    divisor_y: number;
    /**
     * Invert X axis movement.
     */
    invert_x: boolean;
    /**
     * Invert Y axis movement.
     */
    invert_y: boolean;
}

/**
 * Configuration for cursor mode with a remapped primary device button.
 */
export interface CursorRemapConfig {
    /**
     * Motion behaves exactly as it does in cursor mode.
     */
    cursor: CursorConfig;
    /**
     * Mouse-button mask emitted while the device\'s primary button is down.
     * Bit 0 is primary, bit 1 is secondary, and zero suppresses the tap.
     */
    primary_button: number;
}

/**
 * Configuration for drag mode
 *
 * A pad with no physical buttons can still drag: the device\'s own tap
 * gesture latches a button down and holds it, so the next stroke moves
 * whatever the tap grabbed. A second tap drops it.
 */
export interface DragConfig {
    /**
     * Motion behaves exactly as it does in cursor mode.
     */
    cursor: CursorConfig;
    /**
     * Device button whose press toggles the latch, as a bit mask in the
     * HID mouse report\'s button order (bit 0 is the primary button).
     */
    toggled_by: number;
    /**
     * Button held while the latch is engaged, in the same bit order.
     */
    latches: number;
}

/**
 * Configuration for keypad mode
 *
 * Each axis accumulates against its own threshold, allowing infrequent
 * horizontal actions alongside more responsive vertical actions. A primary
 * device tap can emit a fifth keycode independently of motion.
 */
export interface KeypadConfig {
    /**
     * Disable X-axis key output.
     */
    disable_x: boolean;
    /**
     * Disable Y-axis key output.
     */
    disable_y: boolean;
    /**
     * Invert X-axis direction.
     */
    invert_x: boolean;
    /**
     * Invert Y-axis direction.
     */
    invert_y: boolean;
    /**
     * Accumulated X motion required per emitted key tap.
     */
    threshold_x: number;
    /**
     * Accumulated Y motion required per emitted key tap.
     */
    threshold_y: number;
    /**
     * Keycode emitted by upward motion.
     */
    keycode_up: HidKeyCode;
    /**
     * Keycode emitted by downward motion.
     */
    keycode_down: HidKeyCode;
    /**
     * Keycode emitted by leftward motion.
     */
    keycode_left: HidKeyCode;
    /**
     * Keycode emitted by rightward motion.
     */
    keycode_right: HidKeyCode;
    /**
     * Keycode emitted on a primary device tap. [`HidKeyCode::No`] disables it.
     */
    keycode_tap: HidKeyCode;
}

/**
 * Configuration for press mode
 *
 * Dragging without any gesture recognition: the button goes down as soon
 * as the device reports touch presence on the Z axis and comes back up
 * with the liftoff event, so a stroke drags for exactly as long as the
 * finger stays on the pad.
 */
export interface PressConfig {
    /**
     * Motion behaves exactly as it does in cursor mode.
     */
    cursor: CursorConfig;
    /**
     * Button held while a finger is present, as a bit mask in the HID
     * mouse report\'s button order (bit 0 is the primary button).
     */
    holds: number;
}

/**
 * Configuration for sniper (precision) mode
 */
export interface SniperConfig {
    /**
     * Multiplier for both axes. Higher = more output per unit of motion.
     */
    multiplier: number;
    /**
     * Divisor for both axes. Higher = slower, more precise movement.
     */
    divisor: number;
    /**
     * Invert X axis movement.
     */
    invert_x: boolean;
    /**
     * Invert Y axis movement.
     */
    invert_y: boolean;
}

/**
 * Connection and advertising state of one BLE host or dongle profile.
 */
export type BleState = "Advertising" | "Connected" | "Inactive";

/**
 * Connection state and bond of one BLE host or dongle profile.
 */
export interface BleStatus {
    state: BleState;
    /**
     * Whether the profile holds a bond, independent of connection state. False while it re-pairs.
     */
    bonded: boolean;
}

/**
 * Connection type for the keyboard.
 */
export type ConnectionType = "Usb" | "Ble";

/**
 * Create, rename, or update one occupied profile slot.
 */
export interface SetMorseProfileEntryRequest {
    entry: MorseProfileEntry;
}

/**
 * Current matrix key-press state as a bitmap.
 * Bit ordering: row-major, bit 0 = col 0, bit 1 = col 1, etc.
 * Total meaningful bytes = num_rows * ceil(num_cols / 8).
 */
export interface MatrixState {
    pressed_bitmap: number[];
}

/**
 * Current runtime hold-trigger table and the firmware\'s compiled capacity.
 */
export interface MorseHoldTriggerPositionState {
    capacity: number;
    positions: MorseHoldTriggerPosition[];
}

/**
 * Current split BLE latency selection and its policy inputs.
 */
export interface SplitCentralLatencyState {
    policy: SplitCentralLatencyPolicy;
    /**
     * Whether USB power is currently present.
     */
    powered: boolean;
    /**
     * Value currently requested for the active split connection.
     */
    effective: number;
}

/**
 * Definition of a morse key.
 *
 * A morse key is a key that behaves differently according to the pattern of a tap/hold sequence.
 * The maximum number of taps is limited to 15 by the internal u16 representation of MorsePattern.
 * There is a list of (pattern, corresponding action) pairs for each morse key:
 * The number of pairs is limited by `MORSE_SIZE` (from `constants.rs`, generated at build time).
 *
 * Note: `MORSE_SIZE` is a **wire-format** capacity — on firmware it equals
 * `MAX_PATTERNS_PER_KEY` (from `keyboard.toml`), on host it\'s a fixed upper bound.
 */
export interface Morse {
    /**
     * The profile of this morse key, which defines the timing parameters, etc.
     * If some of its fields are filled with None, the global default value will be used.
     */
    profile: MorseProfile;
    /**
     * The list of pattern -> action pairs, which can be triggered
     */
    actions: [number, Action][];
}

/**
 * Description of the single board-defined data namespace exposed by a
 * firmware build. Reverse-domain namespaces are recommended.
 */
export interface DeviceDataDescriptor {
    namespace: string;
    schema_version: number;
    record_count: number;
}

/**
 * Device capabilities discovered during the connection handshake.
 *
 * The host reads this once after connecting to learn the firmware\'s layout,
 * feature set, and protocol limits.
 */
export interface DeviceCapabilities {
    num_layers: number;
    num_rows: number;
    num_cols: number;
    num_encoders: number;
    max_combos: number;
    max_combo_keys: number;
    /**
     * Macro slots, `GetMacro`/`SetMacro` index below this.
     */
    max_macros: number;
    /**
     * Bytes of the buffer every macro shares, in the postcard encoding
     * `GetMacro`/`SetMacro` carry, each slot costing its length prefix.
     */
    macro_space_size: number;
    /**
     * Whether `SetMacro` persists; a firmware without storage serves its
     * compiled-in macros read-only.
     */
    macros_writable: boolean;
    max_morses: number;
    max_patterns_per_key: number;
    max_forks: number;
    storage_enabled: boolean;
    lighting_enabled: boolean;
    is_split: boolean;
    num_split_peripherals: number;
    ble_enabled: boolean;
    /**
     * Host profiles, indexed from 0; excludes the dongle profile.
     */
    num_ble_profiles: number;
    /**
     * Maximum simultaneous BLE host and dongle connections.
     * Excludes USB and split peripheral links; zero when BLE is unavailable.
     */
    max_connections: number;
    /**
     * Index of the dongle profile; `None` without dongle support.
     */
    dongle_profile: number | undefined;
    max_payload_size: number;
    /**
     * Worst-case keys per `GetKeymapBulk` page; paces pipelined reads.
     */
    max_bulk_keys: number;
    /**
     * Worst-case combos/morses per `GetComboBulk`/`GetMorseBulk` page; paces
     * pipelined reads. Separate from `max_bulk_keys` because these items are
     * far larger than keys. Writes pack by encoded size up to `max_payload_size`.
     */
    max_bulk_items: number;
    bulk_transfer_supported: boolean;
}

/**
 * Device identity for display and per-device host profiles.
 *
 * Complements [`DeviceCapabilities`]: capabilities answer \"what can you do\
 * for feature gating, identity answers \"which device is this\".
 */
export interface DeviceInfo {
    rmk_version: FirmwareVersion;
    vendor_id: number;
    product_id: number;
    manufacturer: string;
    product_name: string;
    serial_number: string;
}

/**
 * Every pad\'s behavior, as one replaceable unit.
 *
 * Entries past their counts are padding, so the encoding stays a fixed
 * shape rather than a length-prefixed list.
 */
export interface PointingConfig {
    /**
     * Bumped by the device on every accepted write, so a host that read a
     * stale copy is told to re-read instead of clobbering another\'s edit.
     */
    revision: number;
    /**
     * Valid entries in `devices`.
     */
    device_count: number;
    devices: PointingDeviceConfig[];
    /**
     * Valid entries in `overrides`.
     */
    override_count: number;
    overrides: PointingLayerOverride[];
}

/**
 * Fork (key override) configuration.
 *
 * A fork overrides a key\'s output based on the current modifier/LED/mouse state.
 * When the trigger key is pressed, the fork checks current state against `match_any`
 * and `match_none` to decide between `positive_output` and `negative_output`.
 */
export interface Fork {
    /**
     * The key action that activates this fork. Should not be `KeyAction::Transparent`.
     */
    trigger: KeyAction;
    /**
     * Output when the state condition is NOT met. `Transparent` leaves the key alone.
     */
    negative_output: KeyAction;
    /**
     * Output when the state condition IS met.
     */
    positive_output: KeyAction;
    /**
     * If any of these state bits are active, the positive branch is taken.
     */
    match_any: StateBits;
    /**
     * If any of these state bits are active, the fork is suppressed.
     */
    match_none: StateBits;
    /**
     * Modifiers to keep active when the fork fires.
     */
    kept_modifiers: ModifierCombination;
    /**
     * Whether this fork\'s output is checked against other forks that have not
     * yet triggered, allowing chained replacements.
     */
    bindable: boolean;
    /**
     * Bitmask of layers the trigger must come from. `u32::MAX` means all layers.
     */
    layers: number;
}

/**
 * How a codepoint is spelled out to the host.
 *
 * Every mode types the codepoint as hex digits surrounded by whatever the OS
 * input method uses to delimit them, so the keyboard needs to know which one
 * the host is running.
 */
export type UnicodeMode = "Linux" | "MacOs" | "Windows";

/**
 * How motion becomes scrolling: the vertical wheel and the horizontal pan.
 *
 * Used twice: in [`PointingMode::Scroll`], where X/Y cursor motion scrolls, and as
 * the pointing processor\'s `device_scroll`, for the scrolling a device reports
 * itself on its H/V axes.
 */
export interface ScrollConfig {
    /**
     * Made from Y, or V. Motion +Y scrolls up unless inverted.
     */
    wheel: ScrollAxis;
    /**
     * Made from X, or H.
     */
    pan: ScrollAxis;
}

/**
 * How one scroll output, the wheel or pan, is made from its input axis.
 */
export interface ScrollAxis {
    /**
     * Higher = more output per unit of motion. 0 disables this output.
     */
    multiplier: number;
    /**
     * Higher = slower. 0 disables this output.
     */
    divisor: number;
    /**
     * Reverse the direction.
     */
    invert: boolean;
}

/**
 * Human-readable identity of the firmware build.
 *
 * Unlike [`ProtocolVersion`], this label is deliberately application-defined:
 * it is for diagnostics and display, never compatibility decisions. RMK
 * supplies an RMK-only default and downstream firmware may replace it with a
 * label containing its own package, source revision, or configuration name.
 */
export interface BuildInfo {
    label: string;
}

/**
 * Identifies a specific key position in the keymap.
 */
export interface KeyPosition {
    layer: number;
    row: number;
    col: number;
}

/**
 * Key codes which are not in the HID spec, but still commonly used
 */
export type SpecialKey = "GraveEscape" | "Repeat";

/**
 * Keys in `Generic Desktop Page`, generally used for system control
 * Ref: <https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf#page=26>
 */
export type SystemControlKey = "No" | "PowerDown" | "Sleep" | "WakeUp" | "Restart";

/**
 * Keys in consumer page
 * Ref: <https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf#page=75>
 */
export type ConsumerKey = "No" | "SnapShot" | "BrightnessUp" | "BrightnessDown" | "Play" | "Pause" | "Record" | "FastForward" | "Rewind" | "NextTrack" | "PrevTrack" | "StopPlay" | "Eject" | "RandomPlay" | "Repeat" | "StopEject" | "PlayPause" | "Mute" | "VolumeIncrement" | "VolumeDecrement" | "Reserved" | "Email" | "Calculator" | "LocalBrowser" | "Lock" | "ControlPanel" | "Assistant" | "New" | "Open" | "Close" | "Exit" | "Maximize" | "Minimize" | "Save" | "Print" | "Properties" | "Undo" | "Copy" | "Cut" | "Paste" | "SelectAll" | "Find" | "Search" | "Home" | "Back" | "Forward" | "Stop" | "Refresh" | "Bookmarks" | "NextKeyboardLayoutSelect" | "DesktopShowAllWindows" | "AcSoftKeyLeft" | "Redo" | "BrightnessMinimum" | "BrightnessMaximum" | "BrightnessAuto";

/**
 * Legacy lock status retained for wire compatibility. Current Rynk firmware
 * reports an inert unlocked value; maintenance mode owns authorization.
 *
 * Loses `Copy` and derived `MaxSize` (both forbidden by the `heapless::Vec`
 * field): handlers return it by value, and the bound is hand-written below.
 */
export interface LockStatus {
    locked: boolean;
    /**
     * Whether a legacy unlock attempt is armed.
     */
    unlocking: boolean;
    /**
     * Legacy challenge keys not currently held.
     */
    remaining_keys: number;
    /**
     * Legacy challenge positions; empty on current Rynk firmware.
     */
    key_positions: [number, number][];
}

/**
 * Live and compiled-default host maintenance policy.
 */
export interface MaintenanceMode {
    enabled: boolean;
    default_enabled: boolean;
}

/**
 * Mode for morse key behavior
 */
export type MorseMode = "PermissiveHold" | "HoldOnOtherPress" | "Normal" | "TapUnlessInterrupted";

/**
 * MorsePattern is a sequence of maximum 15 taps or holds that can be encoded into an u16:
 * 0x1 when empty, then 0 for tap or 1 for hold shifted from the right
 */
export type MorsePattern = number;

/**
 * One USB HID modifier key.
 */
export type ModifierKey = "LCtrl" | "LShift" | "LAlt" | "LGui" | "RCtrl" | "RShift" | "RAlt" | "RGui";

/**
 * One atomically sampled page of transient overlay cells. Cell TTLs are
 * remaining relative lifetimes at the sample time, never firmware deadlines.
 */
export interface LightingOverlayPage {
    revision: number;
    total_count: number;
    items: LightingOverlayCell[];
}

/**
 * One auto mouse layer entry in a transport- and storage-friendly form.
 */
export interface AutoMouseLayerConfig {
    device_id: number | undefined;
    target_layer: number;
    timeout_ms: number;
    threshold: number;
    deactivate_on_key: boolean;
    extra_mouse_keys: KeyCode[];
    reset_timeout_on_key: boolean;
}

/**
 * One effect\'s advertised parameters. `LightingExtensionParam` carries each
 * parameter\'s bounds, its firmware default, and its live value in one row, so
 * this is enough to validate a file and to prune defaults out of a pulled one.
 */
export interface EffectParamSet {
    /**
     * Index of the effect within `ExtensionCatalog::effects`.
     */
    effect: number;
    name: string;
    params: LightingExtensionParam[];
}

/**
 * One emitter, reduced to what lowering a selector actually reads: which key
 * owns it, and which zones it belongs to.
 *
 * The LED page also carries a physical position. That answers a different
 * question — where to draw the board — so asking for it here would only give a
 * caller a field to get wrong.
 */
export interface TopologyLed {
    id: LightingLedId;
    key: LightingMatrixPosition | undefined;
    /**
     * Span into `KeyTopologyInput::zone_memberships`.
     */
    zone_start: number;
    zone_len: number;
}

/**
 * One encoder\'s placement within a variant: a fixed 1u knob, so just its
 * center — never resized or L-shaped. `pivot` records the region that swung
 * the center; the knob itself carries no angle.
 */
export interface Encoder {
    id: number;
    x: number;
    y: number;
    pivot: Region | undefined;
}

/**
 * One key position allowed to trigger a tap-hold profile\'s hold action.
 *
 * `profile == u8::MAX` addresses the keyboard-wide default profile. Every
 * other value is a runtime morse-profile slot.
 */
export interface MorseHoldTriggerPosition {
    profile: number;
    row: number;
    col: number;
}

/**
 * One key\'s placement: matrix position, outline `rect` (center + size),
 * rotation, and an optional second rectangle for L-shaped keys (ISO/big-ass
 * Enter). `r` rotates the whole key, `rect2` included.
 */
export interface Key {
    row: number;
    col: number;
    rect: Rect;
    r: number;
    rect2: Rect | undefined;
    /**
     * The rotation region that placed this key — editor metadata only;
     * `rect`/`r` already carry the final geometry. `None` = flat frame.
     */
    pivot: Region | undefined;
}

/**
 * One named semantic zone.
 */
export interface LightingZone {
    id: LightingZoneId;
    name: string;
}

/**
 * One occupied, stable runtime morse profile slot.
 */
export interface MorseProfileEntry {
    index: number;
    name: string;
    profile: MorseProfile;
}

/**
 * One ordered scene transaction chunk. Chunks are applied only by commit.
 */
export interface PutLightingSceneChunkRequest {
    transaction_id: number;
    offset: number;
    cells: LightingSceneCell[];
}

/**
 * One ordered transaction chunk. Chunks are applied only by commit.
 */
export interface PutLightingOverlayChunkRequest {
    transaction_id: number;
    offset: number;
    cells: LightingOverlayCell[];
}

/**
 * One page of an effect\'s parameters. Unlike name pages these carry live
 * values, so they are pinned to `LightingState.revision` like every other
 * mutable lighting read.
 */
export interface LightingExtensionParamsPage {
    revision: number;
    total: number;
    items: LightingExtensionParam[];
}

/**
 * One page of extension effect or palette names. Names are static for a
 * firmware build, so pages carry no revision pin.
 */
export interface LightingExtensionNamesPage {
    total: number;
    items: string[];
}

/**
 * One page of immutable board-compiled layer scenes.
 */
export interface LightingCompiledScenesPage {
    topology_revision: number;
    total_count: number;
    items: LightingSceneCell[];
}

/**
 * One page of stored scene cells, echoing the pinned state revision.
 */
export interface LightingScenesPage {
    revision: number;
    total_count: number;
    items: LightingSceneCell[];
}

/**
 * One page of the colors a lighting node last presented to its output.
 *
 * Cells are the post-brightness logical frame: RMK applies output
 * brightness as a frame transform before the frame is written and
 * committed, so these are the values the driver received. Any further
 * scaling a board\'s driver performs on the way to the wire is below this
 * layer and is not reflected here.
 *
 * Cell order is compositor slot order, meaningful only against a validated
 * topology; `GetLightingRoutes` maps each LED to its node, output, and
 * physical index.
 */
export interface LightingFramePage {
    node: LightingNodeId;
    /**
     * Engine revision the frame was captured at. `None` when the node has
     * not presented a frame yet, when the cells are still its fill color.
     */
    revision: number | undefined;
    /**
     * Slots in this node\'s logical frame.
     */
    total_leds: number;
    /**
     * Index of `cells[0]` within that frame.
     */
    start: number;
    /**
     * How long ago the capture happened. Always `0` for the node serving the
     * request; for a remote node it is the round-trip staleness of the
     * answer, which is what makes a frozen half distinguishable from a
     * correct one.
     */
    age_ms: number;
    cells: LightingRgb8[];
}

/**
 * One page of the sparse named-profile table.
 */
export interface MorseProfileState {
    capacity: number;
    total: number;
    entries: MorseProfileEntry[];
}

/**
 * One parameter value addressed the way `SetLightingExtensionParam` addresses
 * it: by the effect\'s index in the advertised effect list, and the parameter\'s
 * ordinal within that effect\'s own list.
 */
export interface EffectParamWrite {
    effect: number;
    index: number;
    value: number;
}

/**
 * One render variant (e.g. ANSI / ISO): its own keys and encoders. A hidden key
 * reflows the tokens after it — encoders included — so each variant carries its
 * own encoder positions.
 */
export interface Variant {
    name: string;
    keys: Key[];
    encoders: Encoder[];
}

/**
 * One step of a macro.
 */
export type MacroOp = { Tap: Action } | { Press: Action } | { Release: Action } | { Delay: number } | { Char: number } | "PauseForRelease";

/**
 * One tunable parameter advertised by an extension effect: its static
 * descriptor plus the source\'s live value. Descriptor and value travel in
 * one row so a host can render a control from a single read.
 *
 * Parameters are generic: firmware names them, bounds them, and applies
 * them; the protocol ascribes no meaning to any particular name.
 */
export interface LightingExtensionParam {
    name: string;
    min: number;
    max: number;
    default: number;
    value: number;
}

/**
 * One typed record in a board-defined device-data namespace.
 */
export interface DeviceDataRecord {
    key: string;
    volatility: DeviceDataVolatility;
    value: DeviceDataValue;
}

/**
 * One way an imported layout differs from its source.
 */
export interface ImportNote {
    /**
     * True when the binding was imported but behaves differently; false when
     * it could not be represented at all. A parse only succeeds if every note
     * is an approximation, so the strict form never reaches a caller — it is
     * carried anyway so a report can say which kind it is showing.
     */
    approximated: boolean;
    /**
     * Where in the source document, e.g. `layer 3 (Cursor), editor key 41`.
     */
    location: string | undefined;
    message: string;
}

/**
 * Optional pointing features supported by the running firmware.
 *
 * The bit field can grow without changing this payload\'s postcard layout.
 */
export interface PointingCapabilities {
    mode_flags: number;
}

/**
 * Pointing mode determines how raw XY motion is interpreted
 */
export type PointingMode = { Cursor: CursorConfig } | { Scroll: ScrollConfig } | { Sniper: SniperConfig } | { Caret: CaretConfig } | { Drag: DragConfig } | { Press: PressConfig } | { Keypad: KeypadConfig } | { CursorRemap: CursorRemapConfig };

/**
 * Protocol version advertised during the connection handshake.
 */
export interface ProtocolVersion {
    major: number;
    minor: number;
}

/**
 * Protocol-facing behavior configuration (global timing settings).
 */
export interface BehaviorConfig {
    combo_timeout_ms: number;
    oneshot_timeout_ms: number;
    tap_interval_ms: number;
    tap_capslock_interval_ms: number;
    /**
     * Default profile for morse/tap-hold keys; per-key profiles override it.
     * `keyboard.toml` seeds `enable_flow_tap` and both timeouts, so a read
     * returns them; a `None` field falls back to the firmware default.
     */
    morse_default_profile: MorseProfile;
    /**
     * Flow-tap window: a morse key pressed within this time of the previous
     * key press is forced to its tap action.
     */
    morse_prior_idle_time_ms: number;
}

/**
 * Protocol-facing behavior settings added after [`BehaviorConfig`].
 *
 * This is a separate payload rather than an extension of `BehaviorConfig` so
 * older clients and firmware keep their existing postcard layout.
 */
export interface BehaviorOptions {
    tri_layer: [number, number, number] | undefined;
    combo_prior_idle_ms: number | undefined;
    oneshot_activate_on_keypress: boolean;
    oneshot_quick_release: boolean;
    morse_enable_flow_tap: boolean;
    morse_prior_idle_ms: number;
    morse_default_profile: MorseProfile;
}

/**
 * Protocol-level error returned in response payload.
 */
export type RynkError = "Malformed" | "NotReady" | "StorageFault" | "Internal" | "Unimplemented" | "Invalid" | "UnknownCmd" | "Locked" | "Busy";

/**
 * Replace one layer slot\'s persistent metadata.
 */
export interface SetLayerMetadataRequest {
    layer: number;
    metadata: LayerMetadata;
}

/**
 * Request a page of occupied profile slots, offset within the occupied list.
 */
export interface GetMorseProfileStateRequest {
    offset: number;
}

/**
 * Request payload for `GetComboBulk`: read a page of combos starting at slot
 * `start_index`. The firmware returns as many as fit, or an empty page once
 * `start_index` reaches the slot count.
 */
export interface GetComboBulkRequest {
    start_index: number;
}

/**
 * Request payload for `GetEncoderAction`.
 */
export interface GetEncoderRequest {
    encoder_id: number;
    layer: number;
}

/**
 * Request payload for `GetKeymapBulk` endpoint.
 *
 * The run starts at key `(layer, start_row, start_col)` and reads forward
 * through the flat, row-major, layer-major keymap — crossing row and layer
 * boundaries freely. The firmware returns as many consecutive keys as fit,
 * or fewer at the end of the keymap.
 */
export interface GetKeymapBulkRequest {
    layer: number;
    start_row: number;
    start_col: number;
}

/**
 * Request payload for `GetMorseBulk`: read a page of morses starting at slot
 * `start_index`. The firmware returns as many as fit, or an empty page once
 * `start_index` reaches the slot count.
 */
export interface GetMorseBulkRequest {
    start_index: number;
}

/**
 * Request payload for `GetMorseProfileBulk`: read a page of profiles starting
 * at slot `start_index`, with the same paging rules as `GetMorseBulk`.
 */
export interface GetMorseProfileBulkRequest {
    start_index: number;
}

/**
 * Request payload for `SetCombo`.
 */
export interface SetComboRequest {
    index: number;
    config: Combo;
}

/**
 * Request payload for `SetEncoderAction`.
 */
export interface SetEncoderRequest {
    encoder_id: number;
    layer: number;
    action: EncoderAction;
}

/**
 * Request payload for `SetFork`.
 */
export interface SetForkRequest {
    index: number;
    config: Fork;
}

/**
 * Request payload for `SetKeyAction` endpoint.
 */
export interface SetKeyRequest {
    position: KeyPosition;
    action: KeyAction;
}

/**
 * Request payload for `SetKeymapBulk` endpoint.
 *
 * Writes `actions` into the flat, row-major, layer-major keymap starting at
 * key `(layer, start_row, start_col)`, continuing across rows and layers.
 */
export interface SetKeymapBulkRequest {
    layer: number;
    start_row: number;
    start_col: number;
    actions: KeyAction[];
}

/**
 * Request payload for `SetMacro`: replace macro `index` with `macro_ops`.
 */
export interface SetMacroRequest {
    index: number;
    macro_ops: MacroOp[];
}

/**
 * Request payload for `SetMorseProfile`: replace the profile in slot `index`
 * of the named-profile table that tap-hold keys resolve through.
 */
export interface SetMorseProfileRequest {
    index: number;
    profile: MorseProfile;
}

/**
 * Request payload for `SetMorse`.
 */
export interface SetMorseRequest {
    index: number;
    config: Morse;
}

/**
 * Request payload for the additive `SetComboDefinition` endpoint.
 */
export interface SetComboDefinitionRequest {
    index: number;
    definition: ComboDefinition;
}

/**
 * Requested split-transport selection policy. `Auto` returns control to the
 * cable-detect input; `Wired`/`Ble` pin the transport until the next force
 * or reboot (the force is volatile).
 */
export type SplitTransportForce = "Auto" | "Wired" | "Ble";

/**
 * Runtime BLE name template.
 *
 * Every `{slot}` token is replaced with the active profile\'s human-facing,
 * one-based slot number before advertising. A template without the token is
 * a fixed name for every profile.
 */
export interface BleName {
    template: string;
}

/**
 * Snapshot of the split-transport selector.
 */
export interface SplitTransportState {
    /**
     * The board runs an automatic wired/BLE selection policy. When false
     * the remaining fields carry no information.
     */
    auto: boolean;
    /**
     * The volatile forced selection currently applied.
     */
    forced: SplitTransportForce;
    /**
     * The debounced cable-detect input, independent of any force.
     */
    cable_detected: boolean;
    /**
     * The transport the split link currently selects.
     */
    wired_active: boolean;
}

/**
 * Status of a single split peripheral. Peripherals without battery reporting
 * have `battery: Unavailable`.
 */
export interface PeripheralStatus {
    connected: boolean;
    battery: BatteryStatus;
}

/**
 * Storage reset mode for the `StorageReset` endpoint.
 */
export type StorageResetMode = "Full" | "LayoutOnly";

/**
 * The authoring rotation region (KLE\'s `(r, rx, ry)` cluster triple) a key or
 * encoder was placed by, in the same flat frame as `rect` centers. Equal
 * values = one rigid cluster; `Key::r - deg` is the residual own-center angle.
 */
export interface Region {
    deg: number;
    px: number;
    py: number;
}

/**
 * The board\'s advertised semantic topology, as the Rynk lighting metadata
 * pages report it.
 *
 * A document may address lighting by matrix key, logical key id, zone, or
 * \"everything\", and a `[[layer.bind]]` may do the same. Those are questions
 * about the board rather than about the file — which emitters a key owns,
 * which keys a zone holds — so a host that has read the pages passes the
 * answers in here rather than leaving the parse to guess. A caller with no
 * keyboard and no board model omits it; only a document that asks a question
 * about the board then fails, and it says so.
 */
export interface KeyTopologyInput {
    revision: number;
    /**
     * One matrix position per logical key, in key-id order: the id is the
     * index, which is how the topology page reports it.
     */
    keys: LightingMatrixPosition[];
    leds: TopologyLed[];
    zones: LightingZone[];
    /**
     * Flat membership table, indexed by each LED\'s `zone_start`/`zone_len`.
     */
    zone_memberships: LightingZoneId[];
}

/**
 * The complete auto mouse layer table and the firmware\'s compiled capacity.
 */
export interface AutoMouseLayerConfigState {
    capacity: number;
    configs: AutoMouseLayerConfig[];
}

/**
 * The decoded physical layout: one entry per render variant.
 */
export interface LayoutInfo {
    default_variant: number;
    variants: Variant[];
}

/**
 * The device-backed logical state of one fixed-capacity firmware layer slot.
 *
 * Vacant slots keep their physical storage and keymap capacity. Hosts compact
 * occupied slots when deleting or reordering layers and clear the trailing
 * physical slot instead of changing the firmware\'s layer count.
 */
export interface LayerMetadata {
    occupied: boolean;
    name: string;
}

/**
 * The managed runtime state as a browser holds it: the same protocol types the
 * device reports, rather than the TOML file\'s names and colour strings.
 */
export interface RuntimeSnapshot {
    /**
     * Persistent BLE advertising-name template, when supported.
     */
    bluetooth_name?: string | undefined;
    /**
     * Physical matrix row count carried by the source or connected board.
     */
    rows: number;
    /**
     * Physical matrix column count carried by the source or connected board.
     */
    cols: number;
    default_layer: number;
    /**
     * One entry per layer, each row-major over the board matrix.
     */
    layers: KeyAction[][];
    /**
     * Persistent per-slot occupancy and names. `undefined` means the source
     * this came from does not manage layer metadata, so names are left alone.
     */
    layer_names?: LayerMetadata[] | undefined;
    lighting: LightingSnapshot | undefined;
    pointing?: PointingConfig | undefined;
    behaviors?: BehaviorSnapshot;
}

/**
 * The tables a keymap cell addresses by index: morses for `TD(n)`, macros for
 * `TriggerMacro(n)`, and the combos that fire alongside them.
 *
 * Each field distinguishes silence from emptiness the way the lighting fields
 * do: `undefined` means the source says nothing about that table and it must be
 * left as the device holds it, so a document written before these existed can
 * never read as \"clear them\".
 */
export interface BehaviorSnapshot {
    config: BehaviorConfig | undefined;
    options: BehaviorOptions | undefined;
    morse_profiles: MorseProfileEntry[] | undefined;
    hold_trigger_positions: HoldTriggerPosition[] | undefined;
    auto_mouse_layers: AutoMouseLayerConfig[] | undefined;
    morses: Morse[] | undefined;
    combos: ComboDefinition[] | undefined;
    /**
     * Macro operations by stable slot index.
     */
    macros: MacroOp[][] | undefined;
    /**
     * Forks: one key\'s output swapped while a modifier is held. Not addressed
     * by index from a keymap cell — a fork matches the action it replaces.
     */
    forks: Fork[] | undefined;
}

/**
 * Typed host-side view of a tagged lighting predicate.
 */
export type LightingRulePredicate = { Layer: LightingLayerCondition } | { Battery: LightingBatteryCondition } | { OutputMode: LightingOutputMode } | { Connection: LightingConnectionCondition } | { Effects: LightingEffectsCondition } | { Layers: LightingLayersCondition } | { Indicators: LightingIndicatorCondition } | { Maintenance: LightingMaintenanceCondition } | { SplitTransport: LightingSplitTransportCondition } | { Unknown: { tag: number; body: Vec<number, LIGHTING_PREDICATE_BODY_MAX> } };

/**
 * USB device lifecycle. `Suspended` is distinct from `Configured` because
 * the bus is enumerated but transmission is gated on remote wakeup — the
 * first key still needs to reach the USB writer to trigger that wakeup.
 */
export type UsbState = "Disabled" | "Enabled" | "Configured" | "Suspended";

/**
 * Unified connection status: the single source of truth for transport
 * availability and routing. The active transport is derived on demand via
 * [`Self::decide_active`] from the input fields below.
 */
export interface ConnectionStatus {
    usb: UsbState;
    /**
     * Every host profile, then the dongle profile when there is one, indexed by profile number.
     */
    ble: BleStatus[];
    /**
     * The profile that carries input when BLE is the active transport.
     */
    selected: number;
    /**
     * Tiebreaker when both transports are ready.
     */
    preferred: ConnectionType;
}

/**
 * Version of the `rmk` crate baked into the firmware, so hosts can key
 * version-specific behavior off the library release, not the user\'s app.
 */
export interface FirmwareVersion {
    major: number;
    minor: number;
    patch: number;
}

/**
 * Versioned combo representation used by additive Rynk endpoints.
 *
 * The original [`Combo`] wire representation and commands remain unchanged;
 * this enum is carried only by the newer definition endpoints.
 */
export type ComboDefinition = { Actions: Combo } | { Positions: PositionCombo };

/**
 * What a device does when no layer override applies.
 */
export interface PointingDeviceConfig {
    /**
     * RMK pointing-device id this entry configures.
     */
    device_id: number;
    mode: PointingMode;
}

/**
 * What the connected keyboard advertises. The file speaks in effect, palette
 * and parameter *names*; the protocol speaks in indices and ordinals, so a
 * round-trip needs the device\'s own lists to translate between them.
 */
export interface ExtensionCatalog {
    effects: string[];
    palettes: string[];
    /**
     * Advertised parameters per effect, in firmware order. Effects with no
     * parameters are simply absent, matching how the CLI reads them.
     */
    params: EffectParamSet[];
}

/**
 * Whether a board-defined value is fixed for the firmware build or sampled
 * when the host asks for it.
 */
export type DeviceDataVolatility = "Static" | "Live";

/**
 * Which source format a document is written in.
 *
 * The CLI infers this from a path\'s extension. A browser has no path — a file
 * arrives as text from a picker or a drop — so the format is recognized from
 * the document itself and handed back to the caller, which is what lets an
 * export write the same kind of file the user imported.
 */
export type ConfigFormat = "toml" | "moergo-json";

/**
 * While `layer` is the topmost active layer, `device_id` uses `mode`.
 */
export interface PointingLayerOverride {
    layer: number;
    device_id: number;
    mode: PointingMode;
}

/**
 *r" A conjunction of optional layer, battery and output-mode predicates.
 */
export interface LightingConditionSet {
    layer: LightingLayerCondition | undefined;
    battery: LightingBatteryCondition | undefined;
    /**
     *r" Gate on the live output-mode policy. This is what lets the mode
     *r" indicator be an ordinary conditional rule a host can edit, rather
     *r" than something the board has to compile in.
     */
    output_mode: LightingOutputMode | undefined;
}

/**
 *r" A replacement chunk of concatenated postcard-encoded [`LightingRule`]s.
 */
export interface PutLightingRuleChunkRequest {
    transaction_id: number;
    offset: number;
    count: number;
    rules: Vec<number, LIGHTING_RULE_PAGE_BYTES>;
}

/**
 *r" A rule-indexed page of concatenated postcard-encoded [`LightingRule`]s.
 */
export interface LightingRulesPage {
    revision: number;
    total_count: number;
    offset: number;
    count: number;
    rules: Vec<number, LIGHTING_RULE_PAGE_BYTES>;
}

/**
 *r" Active transport selected by `ConnectionStatus::decide_active`.
 */
export type LightingActiveTransport = "Usb" | "Ble" | "NoneActive";

/**
 *r" Additive runtime conditional cell used by the extended endpoints. The
 *r" nested legacy cell keeps its established postcard field order intact.
 */
export interface LightingAdvancedConditionalSceneCell {
    cell: LightingConditionalSceneCell;
    connection: LightingConnectionCondition | undefined;
    effects: LightingEffectsCondition | undefined;
    layers: LightingLayersCondition | undefined;
    indicators: LightingIndicatorCondition | undefined;
}

/**
 *r" Additive runtime conditional cell used by the extended endpoints. The
 *r" nested legacy cell keeps its established postcard field order intact.
 */
export interface LightingExtendedConditionalSceneCell {
    cell: LightingConditionalSceneCell;
    connection: LightingConnectionCondition | undefined;
    effects: LightingEffectsCondition | undefined;
}

/**
 *r" Authoritative mutable state and optimistic-concurrency revision.
 */
export interface LightingState {
    revision: number;
    output_enabled: boolean;
    output_brightness: number;
    background: LightingBackgroundState;
    overlay_len: number;
}

/**
 *r" Authoritative output policy plus the inputs that determine whether the
 *r" LEDs are physically enabled right now.
 */
export interface LightingOutputModeState {
    mode: LightingOutputMode;
    powered: boolean;
    wake_active: boolean;
    effective_enabled: boolean;
    powered_only_scope: LightingPoweredOnlyScope;
    cycle_user_action: number | undefined;
    /**
     *r" Layers that wake lighting while held, as a bitmask. A set rather
     *r#" than a single layer so waking is not tied to one "magic" layer."#
     */
    wake_layers: number;
    indicator: LightingOutputModeIndicator | undefined;
}

/**
 *r" Begin an atomic, multi-packet overlay replacement.
 */
export interface BeginLightingOverlayReplaceRequest {
    expected_revision: number;
    cell_count: number;
}

/**
 *r" Begin an atomic, multi-packet scene-table replacement.
 */
export interface BeginLightingSceneReplaceRequest {
    expected_revision: number;
    cell_count: number;
}

/**
 *r" Best-effort invalidation marker. Hosts recover current authoritative
 *r" state with `GetLightingState`; events never carry a second state copy.
 */
export type LightingChanged = undefined;

/**
 *r" Board-global Q8.8 point in key-pitch units.
 */
export interface LightingPoint3 {
    x: number;
    y: number;
    z: number;
}

/**
 *r" Board-reported state of the replication recovery machine.
 *r
 *r" Hosts still derive `UNAVAILABLE` from link/report presence and
 *r" `UNATTESTED` from absent digest sets; neither is a recovery-machine
 *r" state in its own right.
 */
export type LightingReplicationHealth = "Healthy" | "Resynchronizing" | "Stale" | "Diverged" | "Halted";

/**
 *r" Both sides of the lighting replication handshake in one read.
 */
export interface LightingReplicaStatus {
    central: LightingCentralReplicaState;
    /**
     *r" `None` when the board wired no replication machine, as an
     *r" unsplit build does.
     */
    replication: LightingReplicationMachine | undefined;
    /**
     *r" `None` when the board has heard nothing from the peripheral since
     *r" boot, which is distinct from having heard something stale.
     */
    peripheral: LightingPeripheralReplicaState | undefined;
}

/**
 *r" Bounded set of standard effects understood by the RMK lighting engine.
 */
export type LightingEffect = { Solid: { color: LightingRgb8 } } | { Blink: { color: LightingRgb8; period_ms: number; phase_ms: number; duty: number } } | { Breathe: { color: LightingRgb8; period_ms: number; phase_ms: number; step_ms: number } };

/**
 *r" Built-in effects accepted by this firmware.
 */
export type LightingEffectFlags = number;

/**
 *r" Central-side replication machine, supplied by the board.
 *r
 *r" This is the half of the handshake the protocol cannot infer: whether a
 *r" snapshot is outstanding, which revision was last acknowledged, and
 *r" whether the application link is up at all.
 */
export interface LightingReplicationMachine {
    /**
     *r" Last revision the peripheral acknowledged. `None` when it has
     *r" never acknowledged one since boot.
     */
    last_acked_revision: number | undefined;
    /**
     *r" A snapshot is in flight and its acknowledgement is still pending.
     */
    awaiting_ack: boolean;
    /**
     *r" Bumped whenever the central restarts replication, so a host can
     *r" tell a resend apart from a stuck retry.
     */
    generation: number;
    link_up: boolean;
    /**
     *r" Durable state changed but no full snapshot carrying it has yet
     *r" been acknowledged.
     */
    durable_dirty: boolean;
    /**
     *r" Fast context changed but no matching update has yet been
     *r" acknowledged.
     */
    context_dirty: boolean;
    health: LightingReplicationHealth;
    /**
     *r" Digest set the central expects the peripheral to hold. `None`
     *r" means the board or peer does not support attestation yet.
     */
    expected_digests: LightingReplicaDigests | undefined;
    /**
     *r" Age of the last successful digest comparison. `None` means no
     *r" attestation has succeeded since boot.
     */
    last_attested_age_ms: number | undefined;
    /**
     *r" Consecutive mismatches observed after a recovery snapshot.
     */
    mismatch_count: number;
}

/**
 *r" Color and addressability capabilities of a physical output.
 */
export type LightingOutputCapabilities = number;

/**
 *r" Configured status LED and its mode-specific effects.
 */
export interface LightingOutputModeIndicator {
    led_id: LightingLedId;
    always_on: LightingEffect;
    always_off: LightingEffect;
    powered_only: LightingEffect;
}

/**
 *r" Current selection of the firmware's animated extension band. Indices
 *r" address the name lists served by `GetLightingExtensionNames`.
 */
export interface LightingExtensionState {
    effect: number;
    palette: number;
    value: number;
    speed: number;
}

/**
 *r" Device-independent linear RGB sample.
 */
export interface LightingRgb8 {
    r: number;
    g: number;
    b: number;
}

/**
 *r" Extension-effects discovery: name-list sizes plus the live selection,
 *r" revision-pinned like every other lighting mutation surface.
 */
export interface LightingExtension {
    revision: number;
    effect_count: number;
    palette_count: number;
    state: LightingExtensionState;
}

/**
 *r" FNV-1a-32 digests of the durable right-half projection at `revision`.
 *r
 *r" Expiring-overlay lifetime and fast context such as layers, batteries,
 *r" connection state, and powered/wake state are deliberately excluded.
 *r" They are covered by sequence/revision freshness and direct status
 *r" comparison instead.
 */
export interface LightingReplicaDigests {
    schema: number;
    revision: number;
    settings: number;
    overlay: number;
    scenes: number;
    conditional_scenes: number;
}

/**
 *r" Gate on one slot holding (or not holding) a stored bond, regardless of
 *r" which profile is active.
 */
export interface LightingBondedSlotCondition {
    slot: number;
    bonded: boolean;
}

/**
 *r" Gate on several layers at once, as bitmasks (bit N = layer N): every
 *r" layer in `active` must be active and every layer in `inactive` must
 *r" not be. `LightingLayerCondition` watches one layer, which cannot say
 *r#" "show which layers are held while this status layer is". 32 bits,"#
 *r" not the layer state's 64: every stored rule carries both masks, and
 *r" no board has half that many layers.
 */
export interface LightingLayersCondition {
    active: number;
    inactive: number;
}

/**
 *r" Gate on the automatic split-transport selector. A board without an
 *r" automatic selector parses this condition but can never satisfy it.
 */
export interface LightingSplitTransportCondition {
    link: LightingSplitLink | undefined;
    force: LightingSplitForce | undefined;
}

/**
 *r" Gate on the host's keyboard lock indicators. Each named lock must
 *r" match; an unnamed one is ignored.
 */
export interface LightingIndicatorCondition {
    num_lock: boolean | undefined;
    caps_lock: boolean | undefined;
    scroll_lock: boolean | undefined;
}

/**
 *r" Gate on whether host mutations are currently unlocked.
 */
export interface LightingMaintenanceCondition {
    unlocked: boolean;
}

/**
 *r" Gate on whether the extension band is rendering. An extension is
 *r" enabled while its value is non-zero, so this tracks `RgbTog`.
 */
export interface LightingEffectsCondition {
    enabled: boolean;
}

/**
 *r" Identity of a lighting processor, such as one half of a split keyboard.
 */
export type LightingNodeId = number;

/**
 *r" Identity of one physical output owned by a lighting node.
 */
export type LightingOutputId = number;

/**
 *r" Key/layer controls that gate the configured lighting presentation.
 */
export interface LightingControls {
    output_toggle_user_action: number | undefined;
    /**
     *r" Layers that wake lighting while held, as a bitmask. A set rather
     *r#" than a single layer so waking is not tied to one "magic" layer."#
     */
    wake_layers: number;
}

/**
 *r" Last state heard from a peripheral renderer.
 *r
 *r" Deliberately stale-tolerant: the board answers from whatever it last
 *r" received rather than blocking on a round trip, and `age_ms` says how
 *r" old that is. A large age is itself the diagnosis.
 */
export interface LightingPeripheralReplicaState {
    node: LightingNodeId;
    /**
     *r" Central revision whose snapshot the peripheral last applied.
     *r" `None` when it has applied none.
     */
    applied_revision: number | undefined;
    /**
     *r" The peripheral engine's own revision, which advances locally as
     *r" well and so is not comparable to `applied_revision`.
     */
    engine_revision: number;
    /**
     *r" Layer state the peripheral is rendering from — the replicated
     *r" context, which is where staleness shows up first.
     */
    effective_layer: number;
    default_layer: number;
    active_bits: number;
    powered: boolean;
    wake_active: boolean;
    effective_output_enabled: boolean;
    age_ms: number;
    /**
     *r" Digest set recomputed from the state this renderer applied.
     *r" `None` distinguishes an older/unattested peer from a zero digest.
     */
    digests: LightingReplicaDigests | undefined;
}

/**
 *r" Lighting-domain rejection carried inside Rynk's outer protocol result.
 */
export type LightingError = "Unsupported" | "InvalidRequest" | "InvalidEffect" | "InvalidTtl" | { TopologyRevisionConflict: { expected: number; current: number } } | { StateRevisionConflict: { expected: number; current: number } } | { UnknownLed: { led_id: LightingLedId } } | { OverlayFull: { capacity: number } } | "TransactionBusy" | "InvalidTransaction" | "TransactionExpired" | { TransactionIncomplete: { expected: number; received: number } } | { UnknownLayer: { layer: number } } | { SceneFull: { capacity: number } } | { ConditionalSceneFull: { capacity: number } } | { UnknownNode: { node: LightingNodeId } } | { NodeUnavailable: { node: LightingNodeId } } | { UnknownPredicate: { tag: number } };

/**
 *r" Limits, occupancy, and parseable predicate tags for the rule table.
 */
export interface LightingRuleStatus {
    revision: number;
    capacity: number;
    rule_len: number;
    page_bytes: number;
    max_predicates: number;
    predicates: number;
}

/**
 *r" Link currently carrying split traffic.
 */
export type LightingSplitLink = "Wired" | "Ble";

/**
 *r" Mutable ordered conditional-table status. Unlike the compiled source,
 *r" this table participates in the lighting state revision.
 */
export interface LightingRuntimeConditionalSceneStatus {
    revision: number;
    capacity: number;
    cell_len: number;
    chunk_capacity: number;
}

/**
 *r" Occupancy of the immutable board-compiled layer-scene source.
 *r
 *r" This source is distinct from [`LightingSceneStatus`]'s mutable table
 *r" and is pinned to the topology revision for the firmware build.
 */
export interface LightingCompiledSceneStatus {
    topology_revision: number;
    scene_len: number;
    /**
     *r" Composition policy of the immutable compiled source. This is
     *r" independent from the mutable runtime scene table's policy.
     */
    policy: LightingLayerPolicy;
    chunk_capacity: number;
}

/**
 *r" One concrete output on one lighting node.
 */
export interface LightingOutput {
    node: LightingNodeId;
    id: LightingOutputId;
    pixel_count: number;
    capabilities: LightingOutputCapabilities;
    coverage: LightingOutputCoverage;
}

/**
 *r" One durable scene cell: an effect bound to a stable LED on one layer.
 */
export interface LightingSceneCell {
    layer: number;
    led_id: LightingLedId;
    effect: LightingEffect;
}

/**
 *r" One immutable conditional effect compiled from keyboard configuration.
 */
export interface LightingConditionalSceneCell {
    conditions: LightingConditionSet;
    led_id: LightingLedId;
    effect: LightingEffect;
}

/**
 *r" One ordered runtime lighting rule. Predicate tags must be strictly
 *r" ascending; an empty predicate list makes the rule unconditional.
 */
export interface LightingRule {
    led_id: LightingLedId;
    effect: LightingEffect;
    predicates: Vec<LightingPredicate, LIGHTING_RULE_MAX_PREDICATES>;
}

/**
 *r" One real key in RMK's logical matrix. Matrix holes have no record.
 */
export interface LightingMatrixPosition {
    row: number;
    col: number;
}

/**
 *r" One semantic light. It may have key association, explicit geometry,
 *r" both, or neither.
 */
export interface LightingLed {
    id: LightingLedId;
    key: LightingMatrixPosition | undefined;
    position: LightingPoint3 | undefined;
    /**
     *r" Span into the flat zone-membership table.
     */
    zone_start: number;
    zone_len: number;
}

/**
 *r" One tagged, length-delimited predicate body.
 */
export interface LightingPredicate {
    tag: number;
    body: Vec<number, LIGHTING_PREDICATE_BODY_MAX>;
}

/**
 *r" One transient overlay cell addressed by stable LED identity.
 */
export interface LightingOverlayCell {
    led_id: LightingLedId;
    effect: LightingEffect;
    /**
     *r" Relative lifetime. `None` lasts until unset, clear, or reboot;
     *r" `Some(0)` is invalid.
     */
    ttl_ms: number | undefined;
}

/**
 *r" Opaque scene transaction token allocated by the firmware.
 */
export interface LightingSceneTransaction {
    id: number;
    cell_count: number;
}

/**
 *r" Opaque transaction token allocated by the firmware.
 */
export interface LightingOverlayTransaction {
    id: number;
    cell_count: number;
}

/**
 *r" Optional capabilities beyond the mandatory state/topology surface.
 *r
 *r" A `u32` encodes exactly like the `u16` it replaced for every value
 *r" below `1 << 16`, so widening it changed no frame until the first bit
 *r" past 15 was minted.
 */
export type LightingFeatureFlags = number;

/**
 *r" Optional connection predicates. Present fields form a conjunction; an
 *r" empty condition matches every connection state.
 */
export interface LightingConnectionCondition {
    transport: LightingActiveTransport | undefined;
    profile: number | undefined;
    ble_state: BleState | undefined;
    bonded: LightingBondedSlotCondition | undefined;
    /**
     *r" Gate on USB being plugged and routable, whether or not it is the
     *r" active transport.
     */
    usb_connected: boolean | undefined;
}

/**
 *r" Optional second effect layered over the primary extension selection.
 *r" The effect indexes the same list as `LightingExtensionState.effect`.
 */
export interface LightingExtensionLayers {
    revision: number;
    overlay: number | undefined;
}

/**
 *r" Persistent policy selected by the board's configured cycle action.
 */
export type LightingOutputMode = "AlwaysOn" | "AlwaysOff" | "PoweredOnly";

/**
 *r" Positive Q8.8 key dimensions in key-pitch units.
 */
export interface LightingKeySize {
    width: number;
    height: number;
}

/**
 *r" Power source used by split renderers in `PoweredOnly` mode.
 */
export type LightingPoweredOnlyScope = "Authority" | "Local";

/**
 *r" Replace the set of layers that wake lighting while held. A mask, so any
 *r" combination of layers can wake it rather than one designated layer.
 */
export interface SetLightingWakeLayersRequest {
    expected_revision: number;
    layers: number;
}

/**
 *r" Request one page of a lighting node's last presented frame.
 *r
 *r" `offset` is the first logical frame slot wanted, matching every other
 *r" lighting page request; the reply echoes it as
 *r" [`LightingFramePage::start`]. Frames are not revision-pinned: a stale
 *r" page is the observation being made, not an error, and pinning would
 *r" make the frame unreadable exactly while it is changing.
 */
export interface LightingFrameRequest {
    node: LightingNodeId;
    offset: number;
}

/**
 *r" Revision-pinned request for one metadata page.
 */
export interface LightingPageRequest {
    topology_revision: number;
    offset: number;
}

/**
 *r" Revision-pinned request for one scene page. `revision` is the expected
 *r" [`LightingState::revision`]; a stale read is rejected so multi-page
 *r" reads stay self-consistent.
 */
export interface LightingScenePageRequest {
    revision: number;
    offset: number;
}

/**
 *r" Revision-pinned request for one transient overlay page.
 */
export interface LightingOverlayPageRequest {
    /**
     *r" Expected [`LightingState::revision`].
     */
    revision: number;
    offset: number;
}

/**
 *r" Scene limits and current occupancy. Kept out of
 *r" [`LightingCapabilities`]/[`LightingState`] so their postcard layout is
 *r" unchanged for existing hosts; discovery uses
 *r" [`LightingFeatureFlags::LAYER_SCENES`] plus this endpoint.
 */
export interface LightingSceneStatus {
    /**
     *r" Current [`LightingState::revision`]; scene mutations advance it.
     */
    revision: number;
    /**
     *r" Maximum stored scene cells. `0` means scenes are absent.
     */
    capacity: number;
    scene_len: number;
    policy: LightingLayerPolicy;
    /**
     *r" Cells per `GetLightingScenes` page and per replacement chunk.
     */
    chunk_capacity: number;
}

/**
 *r" Set one parameter of one effect. `index` is the ordinal within that
 *r" effect's parameter list. Setting a parameter of an inactive effect is
 *r" allowed if the source accepts it.
 */
export interface SetLightingExtensionParamRequest {
    expected_revision: number;
    effect: number;
    index: number;
    value: number;
}

/**
 *r" Shared physical-key geometry consumed by lighting, displays, and hosts.
 */
export interface LightingPhysicalKey {
    matrix: LightingMatrixPosition;
    center: LightingPoint3;
    size: LightingKeySize;
    /**
     *r" Clockwise rotation in hundredths of one degree.
     */
    rotation: number;
}

/**
 *r" Stable identity of one semantic lighting zone.
 */
export type LightingZoneId = number;

/**
 *r" Stable, board-wide identity of one independently controllable light.
 */
export type LightingLedId = number;

/**
 *r" Stable-light to physical-address mapping. Dense compositor slots are
 *r" intentionally not part of the public protocol.
 */
export interface LightingRoute {
    led_id: LightingLedId;
    node: LightingNodeId;
    output: LightingOutputId;
    physical_index: number;
}

/**
 *r" Static limits and topology identity for a lighting-enabled device.
 */
export interface LightingCapabilities {
    topology_revision: number;
    /**
     *r" Real logical matrix keys, including keys without measured geometry.
     */
    logical_key_count: number;
    physical_key_count: number;
    led_count: number;
    zone_count: number;
    zone_membership_count: number;
    output_count: number;
    route_count: number;
    overlay_capacity: number;
    page_capacity: number;
    overlay_chunk_capacity: number;
    features: LightingFeatureFlags;
    effects: LightingEffectFlags;
}

/**
 *r" The lighting authority's own state, as the central half sees it.
 */
export interface LightingCentralReplicaState {
    /**
     *r" Live engine revision — what the authority would replicate now.
     */
    revision: number;
    /**
     *r" Engine revision of the last frame the central presented. `None`
     *r" before its output has accepted one.
     */
    presented_revision: number | undefined;
    /**
     *r" Layer state the central's last presented frame was rendered from.
     *r" Zeroed before that first frame.
     */
    effective_layer: number;
    default_layer: number;
    active_bits: number;
    /**
     *r" Live USB/VBUS power as the engine sees it.
     */
    powered: boolean;
    /**
     *r" Whether a configured wake layer currently overrides output policy.
     */
    wake_active: boolean;
    /**
     *r" Final live output decision after mode, power, and wake inputs.
     */
    effective_output_enabled: boolean;
}

/**
 *r" VIA-compatible designated background. It is only the lowest standard
 *r" source; disabling it does not disable layers, overlays, or status.
 */
export interface LightingBackgroundState {
    enabled: boolean;
    hue: number;
    saturation: number;
    value: number;
    speed: number;
    mode: LightingBackgroundMode;
}

/**
 *r" Volatile split-link selection override.
 */
export type LightingSplitForce = "Auto" | "Wired" | "Ble";

/**
 *r" Whether all physical pixels of an output must have a logical route.
 */
export type LightingOutputCoverage = "Complete" | "Sparse";

/**
 *r" Which effect's parameter list a page request addresses. `effect`
 *r" indexes the effect-name list served by `GetLightingExtensionNames`;
 *r" it need not be the active effect.
 */
export interface LightingExtensionParamsRequest {
    effect: number;
    offset: number;
}

/**
 *r" Which extension name list a page request addresses.
 */
export type LightingExtensionNameKind = "Effects" | "Palettes";

/**
 *r" Wire mirror of the engine's layer composition policy.
 */
export type LightingLayerPolicy = "EffectiveOnly" | "ActiveStack";

export interface AbortLightingOverlayReplaceRequest {
    transaction_id: number;
}

export interface AbortLightingRuntimeConditionalSceneReplaceRequest {
    transaction_id: number;
}

export interface AbortLightingSceneReplaceRequest {
    transaction_id: number;
}

export interface BeginLightingRuntimeConditionalSceneReplaceRequest {
    expected_revision: number;
    cell_count: number;
}

export interface ClearLightingOverlayRequest {
    expected_revision: number;
}

export interface CommitLightingOverlayReplaceRequest {
    transaction_id: number;
}

export interface CommitLightingRuntimeConditionalSceneReplaceRequest {
    transaction_id: number;
}

export interface CommitLightingSceneReplaceRequest {
    transaction_id: number;
}

export interface HoldTriggerPosition {
    profile: number;
    row: number;
    col: number;
}

export interface LightingAdvancedRuntimeConditionalScenesPage {
    revision: number;
    total_count: number;
    items: LightingAdvancedConditionalSceneCell[];
}

export interface LightingBatteryCondition {
    node: LightingNodeId;
    min_level: number | undefined;
    max_level: number | undefined;
    charge: LightingChargeCondition;
}

export interface LightingConditionalSceneStatus {
    topology_revision: number;
    cell_len: number;
    chunk_capacity: number;
    controls: LightingControls;
}

export interface LightingConditionalScenesPage {
    topology_revision: number;
    total_count: number;
    items: LightingConditionalSceneCell[];
}

export interface LightingExtendedRuntimeConditionalScenesPage {
    revision: number;
    total_count: number;
    items: LightingExtendedConditionalSceneCell[];
}

export interface LightingExtensionNamesRequest {
    kind: LightingExtensionNameKind;
    offset: number;
}

export interface LightingKeysPage {
    topology_revision: number;
    total_count: number;
    items: LightingMatrixPosition[];
}

export interface LightingLayerCondition {
    layer: number;
    active: boolean;
}

export interface LightingLedsPage {
    topology_revision: number;
    total_count: number;
    items: LightingLed[];
}

export interface LightingMutableState {
    output_enabled: boolean;
    output_brightness: number;
    background: LightingBackgroundState;
}

export interface LightingOutputsPage {
    topology_revision: number;
    total_count: number;
    items: LightingOutput[];
}

export interface LightingPhysicalKeysPage {
    topology_revision: number;
    total_count: number;
    items: LightingPhysicalKey[];
}

export interface LightingRoutesPage {
    topology_revision: number;
    total_count: number;
    items: LightingRoute[];
}

export interface LightingRuntimeConditionalScenePageRequest {
    revision: number;
    offset: number;
}

export interface LightingRuntimeConditionalSceneTransaction {
    id: number;
    cell_count: number;
}

export interface LightingRuntimeConditionalScenesPage {
    revision: number;
    total_count: number;
    items: LightingConditionalSceneCell[];
}

export interface LightingSnapshot {
    brightness: number;
    output_mode: LightingOutputMode;
    wake_layers: number[];
    scene_policy: LightingLayerPolicy;
    background: LightingBackgroundState;
    /**
     * None when the file names no extension effect, or the device exposes none.
     */
    effects: LightingExtensionState | undefined;
    /**
     * The optional second effect layered over `effects`, indexing the same
     * advertised effect list. It travels separately on the wire
     * (`LightingExtensionLayers`), so it does so here too.
     */
    overlay: number | undefined;
    /**
     * Parameter values this snapshot asserts, already resolved to the ordinals
     * the protocol addresses.
     */
    effect_params: EffectParamWrite[];
    scenes: LightingSceneCell[];
    /**
     * The mutable, ordered conditional table. `undefined` means the firmware
     * has no such table at all, which stays distinct from a supported-but-empty
     * one: a file naming rules conflicts with the former and not the latter.
     * Rules use the self-describing predicate encoding. The session layer
     * adapts legacy firmware before crossing this boundary.
     */
    conditional_scenes: LightingRule[] | undefined;
}

export interface LightingZoneMembershipsPage {
    topology_revision: number;
    total_count: number;
    items: LightingZoneId[];
}

export interface LightingZonesPage {
    topology_revision: number;
    total_count: number;
    items: LightingZone[];
}

export interface PutLightingAdvancedRuntimeConditionalSceneChunkRequest {
    transaction_id: number;
    offset: number;
    cells: LightingAdvancedConditionalSceneCell[];
}

export interface PutLightingExtendedRuntimeConditionalSceneChunkRequest {
    transaction_id: number;
    offset: number;
    cells: LightingExtendedConditionalSceneCell[];
}

export interface PutLightingRuntimeConditionalSceneChunkRequest {
    transaction_id: number;
    offset: number;
    cells: LightingConditionalSceneCell[];
}

export interface SetLightingExtensionLayersRequest {
    expected_revision: number;
    overlay: number | undefined;
}

export interface SetLightingExtensionStateRequest {
    expected_revision: number;
    state: LightingExtensionState;
}

export interface SetLightingLayerPolicyRequest {
    expected_revision: number;
    policy: LightingLayerPolicy;
}

export interface SetLightingOutputModeRequest {
    expected_revision: number;
    mode: LightingOutputMode;
}

export interface SetLightingOverlayRequest {
    expected_revision: number;
    cell: LightingOverlayCell;
}

export interface SetLightingSceneCellRequest {
    expected_revision: number;
    cell: LightingSceneCell;
}

export interface SetLightingStateRequest {
    expected_revision: number;
    state: LightingMutableState;
}

export interface UnsetLightingOverlayRequest {
    expected_revision: number;
    led_id: LightingLedId;
}

export interface UnsetLightingSceneCellRequest {
    expected_revision: number;
    layer: number;
    led_id: LightingLedId;
}

export type HidKeyCode = "No" | "ErrorRollover" | "PostFail" | "ErrorUndefined" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "Kc1" | "Kc2" | "Kc3" | "Kc4" | "Kc5" | "Kc6" | "Kc7" | "Kc8" | "Kc9" | "Kc0" | "Enter" | "Escape" | "Backspace" | "Tab" | "Space" | "Minus" | "Equal" | "LeftBracket" | "RightBracket" | "Backslash" | "NonusHash" | "Semicolon" | "Quote" | "Grave" | "Comma" | "Dot" | "Slash" | "CapsLock" | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "PrintScreen" | "ScrollLock" | "Pause" | "Insert" | "Home" | "PageUp" | "Delete" | "End" | "PageDown" | "Right" | "Left" | "Down" | "Up" | "NumLock" | "KpSlash" | "KpAsterisk" | "KpMinus" | "KpPlus" | "KpEnter" | "Kp1" | "Kp2" | "Kp3" | "Kp4" | "Kp5" | "Kp6" | "Kp7" | "Kp8" | "Kp9" | "Kp0" | "KpDot" | "NonusBackslash" | "Application" | "KbPower" | "KpEqual" | "F13" | "F14" | "F15" | "F16" | "F17" | "F18" | "F19" | "F20" | "F21" | "F22" | "F23" | "F24" | "Execute" | "Help" | "Menu" | "Select" | "Stop" | "Again" | "Undo" | "Cut" | "Copy" | "Paste" | "Find" | "KbMute" | "KbVolumeUp" | "KbVolumeDown" | "LockingCapsLock" | "LockingNumLock" | "LockingScrollLock" | "KpComma" | "KpEqualAs400" | "International1" | "International2" | "International3" | "International4" | "International5" | "International6" | "International7" | "International8" | "International9" | "Language1" | "Language2" | "Language3" | "Language4" | "Language5" | "Language6" | "Language7" | "Language8" | "Language9" | "AlternateErase" | "SystemRequest" | "Cancel" | "Clear" | "Prior" | "Return" | "Separator" | "Out" | "Oper" | "ClearAgain" | "Crsel" | "Exsel" | "SystemPower" | "SystemSleep" | "SystemWake" | "AudioMute" | "AudioVolUp" | "AudioVolDown" | "MediaNextTrack" | "MediaPrevTrack" | "MediaStop" | "MediaPlayPause" | "MediaSelect" | "MediaEject" | "Mail" | "Calculator" | "MyComputer" | "WwwSearch" | "WwwHome" | "WwwBack" | "WwwForward" | "WwwStop" | "WwwRefresh" | "WwwFavorites" | "MediaFastForward" | "MediaRewind" | "BrightnessUp" | "BrightnessDown" | "ControlPanel" | "Assistant" | "MissionControl" | "Launchpad" | "MouseUp" | "MouseDown" | "MouseLeft" | "MouseRight" | "MouseBtn1" | "MouseBtn2" | "MouseBtn3" | "MouseBtn4" | "MouseBtn5" | "MouseBtn6" | "MouseBtn7" | "MouseBtn8" | "MouseWheelUp" | "MouseWheelDown" | "MouseWheelLeft" | "MouseWheelRight" | "MouseAccel0" | "MouseAccel1" | "MouseAccel2" | "LCtrl" | "LShift" | "LAlt" | "LGui" | "RCtrl" | "RShift" | "RAlt" | "RGui" | "AcRedo" | "SnapShot" | "MediaPlay" | "MediaPause" | "MediaRandomPlay" | "MediaRepeat" | "MediaStopEject" | "ScreenLock" | "AcNew" | "AcOpen" | "AcClose" | "AcExit" | "AcSave" | "AcPrint" | "AcProperties" | "AcUndo" | "AcCopy" | "AcCut" | "AcPaste" | "AcFind" | "NextKeyboardLayoutSelect" | "BrightnessMinimum" | "BrightnessMaximum" | "BrightnessAuto";

export type KeyCode = { Hid: HidKeyCode } | { Consumer: ConsumerKey } | { SystemControl: SystemControlKey };

export type LedIndicator = { num_lock: boolean; caps_lock: boolean; scroll_lock: boolean; compose: boolean; kana: boolean; };

export type LightingBackgroundMode = "Solid" | "Breathe";

export type LightingChargeCondition = "Any" | "Charging" | "Discharging" | "Unknown";

export type ModifierCombination = { left_ctrl: boolean; left_shift: boolean; left_alt: boolean; left_gui: boolean; right_ctrl: boolean; right_shift: boolean; right_alt: boolean; right_gui: boolean; };

export type MorseProfile = { unilateral_tap: boolean | undefined; opposite_hand_hold: boolean | undefined; enable_flow_tap: boolean | undefined; mode: MorseMode | undefined; hold_timeout_ms: number | undefined; gap_timeout_ms: number | undefined; quick_tap_timeout_ms: number | undefined; retro_tap: boolean | undefined; prior_idle_time_ms: number | undefined; hold_trigger_on_release: boolean | undefined; };

export type MouseButtons = { button1: boolean; button2: boolean; button3: boolean; button4: boolean; button5: boolean; button6: boolean; button7: boolean; button8: boolean; };


/**
 * Recognize a document's format from its text.
 *
 * This is the CLI's `file_format` rule minus the filename half: a document
 * that arrives through a file picker, a drop, or the clipboard has no
 * extension to consult, so only the leading `{` of a JSON object distinguishes
 * the two. A TOML file cannot start that way, which is what makes the test
 * safe rather than merely convenient.
 */
export function detect_config_format(text: string): ConfigFormat;

/**
 * The difference lines `config diff` prints, in the same order and wording.
 *
 * Both sides go through the catalog so effect and palette *names* appear in
 * the report, which is what makes a selection difference readable.
 */
export function diff_config(desired: RuntimeSnapshot, live: RuntimeSnapshot, catalog: ExtensionCatalog): string[];

export function init(): void;

/**
 * Bytes a macro occupies in RMK's shared storage buffer, including slot framing.
 */
export function macro_storage_size(ops: MacroOp[]): number;

/**
 * Parse and validate a configuration document, then restate it in protocol
 * types. The format is recognized from the text, so a caller can hand over
 * whatever the user picked without inspecting it first.
 *
 * The catalog resolves the file's effect, palette and parameter names to the
 * indices and ordinals the protocol addresses, and its advertised bounds are
 * checked here rather than left to the firmware, so an out-of-range parameter
 * is reported by name instead of as a bare rejection. A MoErgo document
 * carries no lighting at all, so for that format the catalog goes unused.
 *
 * `topology` answers the questions a document asks about the board rather than
 * about itself — which emitters a key owns, which keys a zone holds. Omit it
 * only when there is no board model to consult; see [`lower`].
 */
export function parse_config(text: string, catalog: ExtensionCatalog, topology?: KeyTopologyInput | null): RuntimeSnapshot;

/**
 * [`parse_config`], reporting which format the document turned out to be.
 *
 * An importer needs that answer back: the natural thing to write on a later
 * export is the kind of file the user brought in, and only the parse knows
 * which that was.
 */
export function parse_config_document(text: string, catalog: ExtensionCatalog, topology?: KeyTopologyInput | null): ParsedConfig;

/**
 * [`render_config_as`] fixed to TOML, which is the format a `glove80.toml`
 * round-trip means when no one has said otherwise.
 */
export function render_config(snapshot: RuntimeSnapshot, catalog: ExtensionCatalog, previous?: string | null): string;

/**
 * Render live device state as a source document, the way `config pull` does.
 *
 * `previous` is the file being replaced, and it does double duty exactly as it
 * does in the CLI. Whatever its format, it supplies the layer labels: the
 * firmware stores none, so without it every layer comes back as a synthesized
 * `layerN` / `Layer N`. When the output is MoErgo JSON it is *also* the
 * template, which is what preserves the editor-owned fields Rynk does not
 * manage — macros, combos, custom behaviors, the document's own identity. A
 * `previous` that no longer parses is ignored rather than fatal, matching the
 * CLI's `parse_text(...).ok()`.
 */
export function render_config_as(snapshot: RuntimeSnapshot, catalog: ExtensionCatalog, format: ConfigFormat, previous?: string | null): string;

/**
 * [`render_config_as`] fixed to the MoErgo Layout Editor's JSON backup.
 *
 * `template` is the document being replaced. Passing the file the user
 * imported is what makes an import/export round-trip lossless for everything
 * outside the keymap; passing nothing produces a minimal document from
 * scratch, which the editor accepts but which carries none of that history.
 */
export function render_moergo_json(snapshot: RuntimeSnapshot, catalog: ExtensionCatalog, template?: string | null): string;

/**
 * Parse and validate only, reporting the format that was recognized.
 * Deliberately offline, like `config validate`: no catalog, so a file can be
 * checked before any keyboard is connected. Anything that depends on what a
 * particular device advertises — effect and palette names, parameter bounds —
 * is therefore *not* checked here.
 */
export function validate_config(text: string): ConfigFormat;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly detect_config_format: (a: number, b: number) => any;
    readonly diff_config: (a: any, b: any, c: any) => [number, number, number, number];
    readonly init: () => void;
    readonly macro_storage_size: (a: number, b: number) => [number, number, number];
    readonly parse_config: (a: number, b: number, c: any, d: number) => [number, number, number];
    readonly parse_config_document: (a: number, b: number, c: any, d: number) => [number, number, number];
    readonly render_config: (a: any, b: any, c: number, d: number) => [number, number, number, number];
    readonly render_config_as: (a: any, b: any, c: any, d: number, e: number) => [number, number, number, number];
    readonly render_moergo_json: (a: any, b: any, c: number, d: number) => [number, number, number, number];
    readonly validate_config: (a: number, b: number) => [number, number, number];
    readonly _critical_section_1_0_acquire: () => number;
    readonly _critical_section_1_0_release: (a: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
