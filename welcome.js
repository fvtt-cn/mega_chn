const MODULE_NAME = "~~~mega_chn_zh_tw";
const WELCOMED_NAME = "welcomed";
const LISTVER_NAME = "listver";

const TRANSLATORS = [
    "hmqgg",
    "hxqxh",
    "bnp800",
    "TravelingK",
    "psedonatural",
    "Many more from ❤FVTT-CN❤",
];
const LIST_VERSION = 6;

Hooks.on("init", () => {
    game.settings.register(MODULE_NAME, WELCOMED_NAME, {
        name: WELCOMED_NAME,
        scope: "client",
        config: false,
        type: Boolean,
        default: false
    });
    game.settings.register(MODULE_NAME, LISTVER_NAME, {
        name: LISTVER_NAME,
        scope: "client",
        config: false,
        type: Number,
        default: LIST_VERSION
    });
});

Hooks.on("ready", () => {
    const welcomed = game.settings.get(MODULE_NAME, WELCOMED_NAME);
    const listVersion = game.settings.get(MODULE_NAME, LISTVER_NAME);

    if (!welcomed || listVersion < LIST_VERSION) {
        game.settings.set(MODULE_NAME, LISTVER_NAME, LIST_VERSION);

        let list = "";
        for (let tr of TRANSLATORS) {
            list += `<li><b>${tr}</b></li>`;
        }

        let content = `
            <h2>歡迎使用 FVTT 正體中文翻譯 Mega 整合包！</h2>
            <p>Mega 包內置了多個系統和數十個不同模組的海量翻譯，適合各類 GM 和玩家使用。</p>
            <h3>此翻譯包來自FVTT_CN的項目。</h3>
            <h3>此翻譯包的誕生離不開所有譯者的支持，特別鳴謝！</h3>
            <ul>
                ${list}
            </ul>
            <p><small>此外，感謝 <a href="https://weblate.org/">Weblate</a> 項目為此項目提供翻譯流程規范化的軟件支持！</small></p>
            <p>如需參與 FVTT 翻譯工作，或提議支持更多模組/系統，請聯系 <a href="https://github.com/fvtt-cn/">FVTT-CN 組織</a>！</p>
        `;

        const welcomeDialog = new Dialog({
            title: "已開啟 MEGA_CHN_ZH_TW 翻譯整合包！",
            content: content,
            buttons: {
                ok: {
                    icon: '<i class="fas fa-check-circle"></i>',
                    label: "OK"
                },
                check: {
                    icon: '<i class="fas fa-thumbs-up"></i>',
                    label: "不再顯示",
                    callback: () => game.settings.set(MODULE_NAME, WELCOMED_NAME, true)
                }
            }
        });
        welcomeDialog.render(true);
    }
});
