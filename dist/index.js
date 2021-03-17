(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.emojiParser = {}));
}(this, (function (exports) { 'use strict';

    /**
     * 字符查找树
     * @constructor
     */
    class Trie {
        constructor(words) {
            this.tier = 0; // 层级 0 代表顶层
            this.matched = true; // 是否匹配到
            this.wordsIndex = 0; //
            this.children = {};
            words && this.build(words);
        }
        build(words) {
            const len = words.length;
            for (let i = 0; i < len; i++) {
                this.insert(words[i], 0, i);
            }
        }
        insert(word, pos = 0, wordsIndex) {
            if (word.length === 0) {
                return;
            }
            const T = this;
            let s;
            let child;
            if (pos === word.length) {
                T.wordsIndex = wordsIndex;
                return;
            }
            s = word[pos];
            if (T.children[s] === undefined) {
                T.children[s] = new Trie();
                T.matched = false;
                T.children[s].tier = this.tier + 1;
            }
            child = T.children[s];
            child.insert(word, pos + 1, wordsIndex);
        }
        searchOne(str, pos = 0) {
            if (str.length === 0)
                return null;
            const T = this;
            let child;
            let s;
            s = str[pos];
            child = T.children[s];
            if (child !== undefined && pos < str.length) {
                return child.searchOne(str, pos + 1);
            }
            if (child === undefined && !T.matched)
                return null;
            if (T.matched) {
                // matchedPosition: [startIndex of str, wordsIndex of words]
                return { matchedPosition: [pos - T.tier, T.wordsIndex], tier: T.tier };
            }
            return null;
        }
        search(str) {
            if (this.matched)
                return [];
            let len = str.length;
            let searchResult = [];
            let res;
            for (let i = 0; i < len - 1; i++) {
                res = this.searchOne(str, i);
                if (res) {
                    searchResult.push(res.matchedPosition);
                    i = i + res.tier - 1;
                }
            }
            return searchResult;
        }
    }

    const EMOJI_PANEL = {
        "width": 724,
        "height": 658,
        "x": 11,
        "y": 10,
        "paddingTop": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "paddingRight": 0,
        "gapX": 6,
        "gapY": 6
    };
    const EMOJI_DATA = [{ "position": { "x": 0, "y": 0 }, "id": 0, "cn": "[右哼哼]", "hk": "[右哼哼]", "us": "[Bah！R]", "code": "/:@>", "web_code": "/右哼哼" }, { "position": { "x": 1, "y": 0 }, "id": 1, "cn": "[奸笑]", "hk": "[奸笑]", "us": "[Smirk]", "code": "", "web_code": "" }, { "position": { "x": 2, "y": 0 }, "id": 2, "cn": "[红包]", "hk": "[Packet]", "us": "[Packet]", "code": "", "web_code": "" }, { "position": { "x": 3, "y": 0 }, "id": 3, "cn": "[生病]", "emoji": "😷", "hk": "", "us": "", "code": "\\ue40c", "web_code": "" }, { "position": { "x": 4, "y": 0 }, "id": 4, "cn": "[冷汗]", "hk": "[冷汗]", "us": "[Blush]", "code": "/:--b", "web_code": "/冷汗" }, { "position": { "x": 5, "y": 0 }, "id": 5, "cn": "[惊恐]", "hk": "[驚恐]", "us": "[Panic]", "code": "/::!", "web_code": "/惊恐" }, { "position": { "x": 6, "y": 0 }, "id": 6, "cn": "[Emm]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 7, "y": 0 }, "id": 7, "cn": "[得意]", "hk": "[得意]", "us": "[CoolGuy]", "code": "/:8-)", "web_code": "/得意" }, { "position": { "x": 8, "y": 0 }, "id": 8, "cn": "[菜刀]", "hk": "[菜刀]", "us": "[Cleaver]", "code": "/:pd", "web_code": "/菜刀" }, { "position": { "x": 9, "y": 0 }, "id": 9, "cn": "[太阳]", "hk": "[太陽]", "us": "[Sun]", "code": "/:sun", "web_code": "/太阳" }, { "position": { "x": 10, "y": 0 }, "id": 10, "cn": "[强壮]", "emoji": "💪", "hk": "", "us": "", "code": "\\ue14c", "web_code": "" }, { "position": { "x": 0, "y": 1 }, "id": 11, "cn": "[捂脸]", "hk": "[掩面]", "us": "[Facepalm]", "code": "", "web_code": "" }, { "position": { "x": 1, "y": 1 }, "id": 12, "cn": "[机智]", "hk": "[機智]", "us": "[Smart]", "code": "", "web_code": "" }, { "position": { "x": 2, "y": 1 }, "id": 13, "cn": "[耶]", "hk": "[歐耶]", "us": "[Yeah!]", "code": "", "web_code": "" }, { "position": { "x": 3, "y": 1 }, "id": 14, "cn": "[尴尬]", "hk": "[尷尬]", "us": "[Awkward]", "code": "/::-|", "web_code": "/尴尬" }, { "position": { "x": 4, "y": 1 }, "id": 15, "cn": "[抓狂]", "hk": "[抓狂]", "us": "[Scream]", "code": "/::Q", "web_code": "/抓狂" }, { "position": { "x": 5, "y": 1 }, "id": 16, "cn": "[流汗]", "hk": "[流汗]", "us": "[Sweat]", "code": "/::L", "web_code": "/流汗" }, { "position": { "x": 6, "y": 1 }, "id": 17, "cn": "[社会社会]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 7, "y": 1 }, "id": 18, "cn": "[擦汗]", "hk": "[擦汗]", "us": "[Speechless]", "code": "/:wipe", "web_code": "/擦汗" }, { "position": { "x": 8, "y": 1 }, "id": 19, "cn": "[西瓜]", "hk": "[西瓜]", "us": "[Watermelon]", "code": "/:<W>", "web_code": "/西瓜" }, { "position": { "x": 9, "y": 1 }, "id": 20, "cn": "[拥抱]", "hk": "[擁抱]", "us": "[Hug]", "code": "/:hug", "web_code": "/拥抱" }, { "position": { "x": 10, "y": 1 }, "id": 21, "cn": "[破涕为笑]", "emoji": "😂", "hk": "", "us": "", "code": "\\ue412", "web_code": "" }, { "position": { "x": 0, "y": 2 }, "id": 22, "cn": "[皱眉]", "hk": "[皺眉]", "us": "[Moue]", "code": "", "web_code": "" }, { "position": { "x": 1, "y": 2 }, "id": 23, "cn": "[鸡]", "hk": "[小雞]", "us": "[Chick]", "code": "", "web_code": "" }, { "position": { "x": 2, "y": 2 }, "id": 24, "cn": "[微笑]", "hk": "[微笑]", "us": "[Smile]", "code": "/::)", "web_code": "/微笑" }, { "position": { "x": 3, "y": 2 }, "id": 25, "cn": "[发怒]", "hk": "[發怒]", "us": "[Angry]", "code": "/::@", "web_code": "/发怒" }, { "position": { "x": 4, "y": 2 }, "id": 26, "cn": "[吐]", "hk": "[吐]", "us": "[Puke]", "code": "/::T", "web_code": "/吐" }, { "position": { "x": 5, "y": 2 }, "id": 27, "cn": "[憨笑]", "hk": "[大笑]", "us": "[Laugh]", "code": "/::>", "web_code": "/憨笑" }, { "position": { "x": 6, "y": 2 }, "id": 28, "cn": "[旺柴]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 7, "y": 2 }, "id": 29, "cn": "[抠鼻]", "hk": "[摳鼻]", "us": "[NosePick]", "code": "/:dig", "web_code": "/抠鼻" }, { "position": { "x": 8, "y": 2 }, "id": 30, "cn": "[啤酒]", "hk": "[啤酒]", "us": "[Beer]", "code": "/:beer", "web_code": "/啤酒" }, { "position": { "x": 9, "y": 2 }, "id": 31, "cn": "[强]", "hk": "[強]", "us": "[ThumbsUp]", "code": "/:strong", "web_code": "/强" }, { "position": { "x": 10, "y": 2 }, "id": 32, "cn": "[笑脸]", "emoji": "😄", "hk": "", "us": "", "code": "\\ue415", "web_code": "" }, { "position": { "x": 0, "y": 3 }, "id": 33, "cn": "[调皮]", "hk": "[調皮]", "us": "[Tongue]", "code": "/::P", "web_code": "/调皮" }, { "position": { "x": 1, "y": 3 }, "id": 34, "cn": "[呲牙]", "hk": "[呲牙]", "us": "[Grin]", "code": "/::D", "web_code": "/呲牙" }, { "position": { "x": 2, "y": 3 }, "id": 35, "cn": "[惊讶]", "hk": "[驚訝]", "us": "[Surprise]", "code": "/::O", "web_code": "/惊讶" }, { "position": { "x": 3, "y": 3 }, "id": 36, "cn": "[难过]", "hk": "[難過]", "us": "[Frown]", "code": "/::(", "web_code": "/难过" }, { "position": { "x": 4, "y": 3 }, "id": 37, "cn": "[色]", "hk": "[色]", "us": "[Drool]", "code": "/::B", "web_code": "/色" }, { "position": { "x": 5, "y": 3 }, "id": 38, "cn": "[悠闲]", "hk": "[悠閑]", "us": "[Commando]", "code": "/::,@", "web_code": "/大兵" }, { "position": { "x": 6, "y": 3 }, "id": 39, "cn": "[疑问]", "hk": "[疑問]", "us": "[Shocked]", "code": "/:?", "web_code": "/疑问" }, { "position": { "x": 7, "y": 3 }, "id": 40, "cn": "[鼓掌]", "hk": "[鼓掌]", "us": "[Clap]", "code": "/:handclap", "web_code": "/鼓掌" }, { "position": { "x": 8, "y": 3 }, "id": 41, "cn": "[害羞]", "hk": "[害羞]", "us": "[Shy]", "code": "/::$", "web_code": "/害羞" }, { "position": { "x": 9, "y": 3 }, "id": 42, "cn": "[睡]", "hk": "[睡]", "us": "[Sleep]", "code": "/::Z", "web_code": "/睡" }, { "position": { "x": 10, "y": 3 }, "id": 43, "cn": "[无语]", "emoji": "😒", "hk": "", "us": "", "code": "\\ue40e", "web_code": "" }, { "position": { "x": 0, "y": 4 }, "id": 44, "cn": "[偷笑]", "hk": "[偷笑]", "us": "[Chuckle]", "code": "/:,@P", "web_code": "/偷笑" }, { "position": { "x": 1, "y": 4 }, "id": 45, "cn": "[愉快]", "hk": "[愉快]", "us": "[Joyful]", "code": "/:,@-D", "web_code": "/可爱" }, { "position": { "x": 2, "y": 4 }, "id": 46, "cn": "[白眼]", "hk": "[白眼]", "us": "[Slight]", "code": "/::d", "web_code": "/白眼" }, { "position": { "x": 3, "y": 4 }, "id": 47, "cn": "[傲慢]", "hk": "[傲慢]", "us": "[Smug]", "code": "/:,@o", "web_code": "/傲慢" }, { "position": { "x": 4, "y": 4 }, "id": 48, "cn": "[困]", "hk": "[累]", "us": "[Drowsy]", "code": "/:|-)", "web_code": "/困" }, { "position": { "x": 5, "y": 4 }, "id": 49, "cn": "[发呆]", "hk": "[發呆]", "us": "[Scowl]", "code": "/::|", "web_code": "/发呆" }, { "position": { "x": 6, "y": 4 }, "id": 50, "cn": "[好的]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 7, "y": 4 }, "id": 51, "cn": "[坏笑]", "hk": "[壞笑]", "us": "[Trick]", "code": "/:B-)", "web_code": "/坏笑" }, { "position": { "x": 8, "y": 4 }, "id": 52, "cn": "[咖啡]", "hk": "[咖啡]", "us": "[Coffee]", "code": "/:coffee", "web_code": "/咖啡" }, { "position": { "x": 9, "y": 4 }, "id": 53, "cn": "[弱]", "hk": "[弱]", "us": "[ThumbsDown]", "code": "/:weak", "web_code": "/弱" }, { "position": { "x": 10, "y": 4 }, "id": 54, "cn": "[失望]", "emoji": "😔", "hk": "", "us": "", "code": "\\ue403", "web_code": "" }, { "position": { "x": 0, "y": 5 }, "id": 55, "cn": "[奋斗]", "hk": "[奮鬥]", "us": "[Determined]", "code": "/:,@f", "web_code": "/奋斗" }, { "position": { "x": 1, "y": 5 }, "id": 56, "cn": "[咒骂]", "hk": "[咒罵]", "us": "[Scold]", "code": "/::-S", "web_code": "/咒骂" }, { "position": { "x": 2, "y": 5 }, "id": 57, "cn": "[吃瓜]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 3, "y": 5 }, "id": 58, "cn": "[加油]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 4, "y": 5 }, "id": 59, "cn": "[汗]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 5, "y": 5 }, "id": 60, "cn": "[天啊]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 6, "y": 5 }, "id": 61, "cn": "[打脸]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 7, "y": 5 }, "id": 62, "cn": "[左哼哼]", "hk": "[左哼哼]", "us": "[Bah！L]", "code": "/:<@", "web_code": "/左哼哼" }, { "position": { "x": 8, "y": 5 }, "id": 63, "cn": "[饭]", "hk": "[飯]", "us": "[Rice]", "code": "/:eat", "web_code": "/饭" }, { "position": { "x": 9, "y": 5 }, "id": 64, "cn": "[握手]", "hk": "[握手]", "us": "[Shake]", "code": "/:share", "web_code": "/握手" }, { "position": { "x": 10, "y": 5 }, "id": 65, "cn": "[吐舌]", "emoji": "😝", "hk": "", "us": "", "code": "\\ue409", "web_code": "" }, { "position": { "x": 0, "y": 6 }, "id": 66, "cn": "[哇]", "hk": "[]", "us": "[]", "code": "", "web_code": "" }, { "position": { "x": 1, "y": 6 }, "id": 67, "cn": "[嘘]", "hk": "[噓]", "us": "[Shhh]", "code": "/:,@x", "web_code": "/嘘" }, { "position": { "x": 2, "y": 6 }, "id": 68, "cn": "[晕]", "hk": "[暈]", "us": "[Dizzy]", "code": "/:,@@", "web_code": "/晕" }, { "position": { "x": 3, "y": 6 }, "id": 69, "cn": "[衰]", "hk": "[衰]", "us": "[Toasted]", "code": "/:,@!", "web_code": "/衰" }, { "position": { "x": 4, "y": 6 }, "id": 70, "cn": "[骷髅]", "hk": "[骷髏頭]", "us": "[Skull]", "code": "/:!!!", "web_code": "/骷髅" }, { "position": { "x": 5, "y": 6 }, "id": 71, "cn": "[敲打]", "hk": "[敲打]", "us": "[Hammer]", "code": "/:xx", "web_code": "/敲打" }, { "position": { "x": 6, "y": 6 }, "id": 72, "cn": "[再见]", "hk": "[再見]", "us": "[Wave]", "code": "/:bye", "web_code": "/再见" }, { "position": { "x": 7, "y": 6 }, "id": 73, "cn": "[嘿哈]", "hk": "[吼嘿]", "us": "[Hey]", "code": "", "web_code": "" }, { "position": { "x": 8, "y": 6 }, "id": 74, "cn": "[猪头]", "hk": "[豬頭]", "us": "[Pig]", "code": "/:pig", "web_code": "/猪头" }, { "position": { "x": 9, "y": 6 }, "id": 75, "cn": "[胜利]", "hk": "[勝利]", "us": "[Peace]", "code": "/:v", "web_code": "/胜利" }, { "position": { "x": 10, "y": 6 }, "id": 76, "cn": "[恐惧]", "emoji": "😱", "hk": "", "us": "", "code": "\\ue107", "web_code": "" }, { "position": { "x": 0, "y": 7 }, "id": 77, "cn": "[哈欠]", "hk": "[哈欠]", "us": "[Yawn]", "code": "/::-O", "web_code": "/哈欠" }, { "position": { "x": 1, "y": 7 }, "id": 78, "cn": "[鄙视]", "hk": "[鄙視]", "us": "[Pooh-pooh]", "code": "/:>-|", "web_code": "/鄙视" }, { "position": { "x": 2, "y": 7 }, "id": 79, "cn": "[委屈]", "hk": "[委屈]", "us": "[Shrunken]", "code": "/:P-(", "web_code": "/委屈" }, { "position": { "x": 3, "y": 7 }, "id": 80, "cn": "[流泪]", "hk": "[流淚]", "us": "[Sob]", "code": "/::<", "web_code": "/流泪" }, { "position": { "x": 4, "y": 7 }, "id": 81, "cn": "[快哭了]", "hk": "[快哭了]", "us": "[TearingUp]", "code": "/::\"|", "web_code": "/快哭了" }, { "position": { "x": 5, "y": 7 }, "id": 82, "cn": "[阴险]", "hk": "[陰險]", "us": "[Sly]", "code": "/:X-)", "web_code": "/阴险" }, { "position": { "x": 6, "y": 7 }, "id": 83, "cn": "[亲亲]", "hk": "[親親]", "us": "[Kiss]", "code": "/::*", "web_code": "/亲亲" }, { "position": { "x": 7, "y": 7 }, "id": 84, "cn": "[可怜]", "hk": "[可憐]", "us": "[Whimper]", "code": "/:8*", "web_code": "/可怜" }, { "position": { "x": 8, "y": 7 }, "id": 85, "cn": "[玫瑰]", "hk": "[玫瑰]", "us": "[Rose]", "code": "/:rose", "web_code": "/玫瑰" }, { "position": { "x": 9, "y": 7 }, "id": 86, "cn": "[抱拳]", "hk": "[抱拳]", "us": "[Fight]", "code": "/:@)", "web_code": "/抱拳" }, { "position": { "x": 10, "y": 7 }, "id": 87, "cn": "[脸红]", "emoji": "😳", "hk": "", "us": "", "code": "\\ue40d", "web_code": "" }, { "position": { "x": 0, "y": 8 }, "id": 88, "cn": "[凋谢]", "hk": "[枯萎]", "us": "[Wilt]", "code": "/:fade", "web_code": "/凋谢" }, { "position": { "x": 1, "y": 8 }, "id": 89, "cn": "[嘴唇]", "hk": "[嘴唇]", "us": "[Lips]", "code": "/:showlove", "web_code": "/示爱" }, { "position": { "x": 2, "y": 8 }, "id": 90, "cn": "[爱心]", "hk": "[愛心]", "us": "[Heart]", "code": "/:heart", "web_code": "/爱心" }, { "position": { "x": 3, "y": 8 }, "id": 91, "cn": "[心碎]", "hk": "[心碎]", "us": "[BrokenHeart]", "code": "/:break", "web_code": "/心碎" }, { "position": { "x": 4, "y": 8 }, "id": 92, "cn": "[蛋糕]", "hk": "[蛋糕]", "us": "[Cake]", "code": "/:cake", "web_code": "/蛋糕" }, { "position": { "x": 5, "y": 8 }, "id": 93, "cn": "[闭嘴]", "hk": "[閉嘴]", "us": "[Silent]", "code": "/::X", "web_code": "/闭嘴" }, { "position": { "x": 6, "y": 8 }, "id": 94, "cn": "[炸弹]", "hk": "[炸彈]", "us": "[Bomb]", "code": "/:bome", "web_code": "/炸弹" }, { "position": { "x": 7, "y": 8 }, "id": 95, "cn": "[便便]", "hk": "[便便]", "us": "[Poop]", "code": "/:shit", "web_code": "/便便" }, { "position": { "x": 8, "y": 8 }, "id": 96, "cn": "[月亮]", "hk": "[月亮]", "us": "[Moon]", "code": "/:moon", "web_code": "/月亮" }, { "position": { "x": 9, "y": 8 }, "id": 97, "cn": "[勾引]", "hk": "[勾引]", "us": "[Beckon]", "code": "/:jj", "web_code": "/勾引" }, { "position": { "x": 10, "y": 8 }, "id": 98, "cn": "[合十]", "emoji": "🙏", "hk": "", "us": "", "code": "\\ue41d", "web_code": "" }, { "position": { "x": 0, "y": 9 }, "id": 99, "cn": "[拳头]", "hk": "[拳頭]", "us": "[Fist]", "code": "/:@@", "web_code": "/拳头" }, { "position": { "x": 1, "y": 9 }, "id": 100, "cn": "[OK]", "hk": "[OK]", "us": "[OK]", "code": "/:ok", "web_code": "/OK" }, { "position": { "x": 2, "y": 9 }, "id": 101, "cn": "[大哭]", "hk": "[大哭]", "us": "[Cry]", "code": "/::\"(", "web_code": "/大哭" }, { "position": { "x": 3, "y": 9 }, "id": 102, "cn": "[跳跳]", "hk": "[跳跳]", "us": "[Waddle]", "code": "/:jump", "web_code": "/跳跳" }, { "position": { "x": 4, "y": 9 }, "id": 103, "cn": "[发抖]", "hk": "[發抖]", "us": "[Tremble]", "code": "/:shake", "web_code": "/发抖" }, { "position": { "x": 5, "y": 9 }, "id": 104, "cn": "[怄火]", "hk": "[噴火]", "us": "[Aaagh!]", "code": "/:<O>", "web_code": "/怄火" }, { "position": { "x": 6, "y": 9 }, "id": 105, "cn": "[转圈]", "hk": "[轉圈]", "us": "[Twirl]", "code": "/:circle", "web_code": "/转圈" }, { "position": { "x": 7, "y": 9 }, "id": 106, "cn": "[礼物]", "hk": "", "us": "", "code": "\\ue112", "web_code": "" }, { "position": { "x": 8, "y": 9 }, "id": 107, "cn": "[庆祝]", "emoji": "🎉", "hk": "", "us": "", "code": "\\ue312", "web_code": "" }, { "position": { "x": 9, "y": 9 }, "id": 108, "cn": "[鬼魂]", "emoji": "👻", "hk": "", "us": "", "code": "\\ue11b", "web_code": "" }, { "position": { "x": 10, "y": 9 }, "id": 109, "cn": "[撇嘴]", "hk": "[撇嘴]", "us": "[Grimace]", "code": "/::~", "web_code": "/撇嘴" }];
    function transform2KeyPosition(data) {
        let usedKeys = ['cn', 'us', 'code', 'web_code'];
        let res = {};
        data.forEach((item) => {
            usedKeys.forEach((key) => {
                let trieKey = item[key];
                if (trieKey && trieKey !== '[]') {
                    (trieKey in res) && (console.warn(`emoji code '${trieKey}' is repeat!!! id is ` + item.id));
                    res[trieKey] = item.position;
                }
            });
        });
        return res;
    }
    const EMOJI_KEY_POSITION = transform2KeyPosition(EMOJI_DATA);

    function stringSplice(str, index, count, addedStr) {
        return str.slice(0, index) + addedStr + str.slice(index + count);
    }

    const emojiKeys = Object.keys(EMOJI_KEY_POSITION);
    const trie = new Trie(emojiKeys);
    const emojiOption = {
        size: 64,
        tag: 'a',
        emojiSpriteUrl: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png'
    };
    let panelScaleCache = {};
    function calculateScaleAndBgSize(panel, emojiSize) {
        if (panelScaleCache[emojiSize])
            return panelScaleCache[emojiSize];
        let { width, x, paddingLeft, paddingRight, gapX } = panel;
        // 计算背景宽度应该缩放到多少
        let originSize = (width - paddingLeft - paddingRight - gapX * (x - 1)) / x;
        let scale = emojiSize / originSize;
        let bgSize = width * scale; // bgSize / width = emojiSize / originSize 比例是相等的
        panelScaleCache[emojiSize] = { scale, bgSize };
        return panelScaleCache[emojiSize];
    }
    function transform2Html(name, position, emojiOption) {
        let { gapX, gapY } = EMOJI_PANEL;
        const emojiSize = emojiOption.size;
        const url = emojiOption.emojiSpriteUrl;
        let { scale, bgSize } = calculateScaleAndBgSize(EMOJI_PANEL, emojiSize);
        let bgPosition = '';
        if (position) {
            let { x, y } = position;
            let left = -x * (emojiSize + scale * gapX);
            let top = -y * (emojiSize + scale * gapY);
            bgPosition = `${left}px ${top}px`;
        }
        return `<a title="${name}" class="wx-emoji" style="display: inline-block;background: url(${url}) no-repeat;width: ${emojiSize}px;
    height: ${emojiSize}px; background-position:${bgPosition}; background-size: ${bgSize}px;"></a>`;
    }
    function emojiParser(str) {
        if (!str)
            return str;
        let matchedEmoji = trie.search(str);
        matchedEmoji.reverse().map(([emojiIndex, keyIndex]) => {
            let name = emojiKeys[keyIndex], position = EMOJI_KEY_POSITION[name];
            let html = transform2Html(name, position, emojiOption);
            str = stringSplice(str, emojiIndex, name.length, html);
        });
        return str;
    }
    function initEmojiParser(option) {
        if (option) {
            Object.assign(emojiOption, option);
        }
    }

    exports.emojiParser = emojiParser;
    exports.initEmojiParser = initEmojiParser;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
