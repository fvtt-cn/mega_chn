const MODULE_NAME = "~~~mega_chn";
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
            <h2>欢迎使用 FVTT 中文翻译 Mega 整合包！</h2>
            <p>Mega 包内置了多个系统和数十个不同模组的海量翻译，适合各类 GM 和玩家使用。</p>
            <h3>此翻译包的诞生离不开所有译者的支持，特别鸣谢！</h3>
            <ul>
                ${list}
            </ul>
            <p><small>此外，感谢 <a href="https://weblate.org/">Weblate</a> 项目为此项目提供翻译流程规范化的软件支持！</small></p>
            <p>如需参与 FVTT 翻译工作，或提议支持更多模组/系统，请联系 <a href="https://github.com/fvtt-cn/">FVTT-CN 组织</a>！</p>
        `;

        const welcomeDialog = new Dialog({
            title: "已开启 MEGA_CHN 翻译整合包！",
            content: content,
            buttons: {
                ok: {
                    icon: '<i class="fas fa-check-circle"></i>',
                    label: "OK"
                },
                check: {
                    icon: '<i class="fas fa-thumbs-up"></i>',
                    label: "不再显示",
                    callback: () => game.settings.set(MODULE_NAME, WELCOMED_NAME, true)
                }
            }
        });
        welcomeDialog.render(true);
    }
});
