const min_duration_ambient = 5000;
const delay_ambient = 1000; // через сколько заметит взгляд и врубит амбиент
const trans_delay = 3000;
let last_ambs = [
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
    ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''], ['nothing', ''],
];
let prev_chosen_amb_src = 'nothing';
let prev_chosen_amb_ts = {};
let translated_sent = {};

// console.log('last ambient', last_ambient);

predict_ambient = function (s, w_id)
{
    let keywords =
        {
            "дождь": "./sounds/Rain.mp3",
            "капли": "./sounds/Rain.mp3",
            "лес": "./sounds/Forest.mp3",
            "ночь": "./sounds/nightInForest.mp3",
            "пение": "./sounds/Birds.mp3",
            "птиц": "./sounds/Birds.mp3",
            "море": "./sounds/Sea.mp3",
            "ручей": "./sounds/Sea.mp3",
            "ветер": "./sounds/Windy.mp3",
            "листья": "./sounds/Windy.mp3",
            "ветерок":"./sounds/Windy.mp3",
            "ветрище":"./sounds/Windy.mp3",
            "ветерок":"./sounds/Windy.mp3",
            "вьюга":"./sounds/Windy.mp3",
            "волны": "./sounds/Sea.mp3",
            "полночь": "./sounds/nightInForest.mp3",
            "луна": "./sounds/nightInForest.mp3",
            "деревья": "./sounds/Forest.mp3",
            "поляна": "./sounds/Forest.mp3",
            "дерев": "./sounds/Forest.mp3",

        };
    let found_something = false;
    let used = {};
    for (let key in keywords)
    {
        let src = keywords[key];
        // let now = +new Date;
        if (s.toLowerCase().includes(key.toLowerCase()) && !used[key.toLowerCase()])
        {
            used[key.toLowerCase()] = true;
            found_something = true;
            last_ambs.push([key, src, s, w_id]);
            last_ambs.shift();
            /*
            console.log(src, last_ambient.source);
            console.log(now - delay_ambient, last_ambient.timestamp);
            if (last_ambient.source === 'nothing')
            {
                last_ambient.source = src;
                last_ambient.timestamp = +new Date;
            }
            if (src !== 'nothing' &&
                src === last_ambient.source &&
                now - delay_ambient >= last_ambient.timestamp)
            {
                document.getElementById("tune_src").src = src;
                document.getElementById("tune").play();
                console.log('sound on!');
                last_ambient.source = src;
                last_ambient.timestamp = +new Date;
            }
            */
        }
    }

    if (!found_something)
    {
        last_ambs.push(['nothing', '']);
        last_ambs.shift();
    }

    let cnt = {};
    for (let i = 0; i < last_ambs.length; i++)
        cnt[last_ambs[i][1]] = 0;
    for (let i = 0; i < last_ambs.length; i++)
        cnt[last_ambs[i][1]]++;
    let max_cnt = 0, max_src = 'nothing', max_sent = 'nothing', max_sent_id = 'nothing';
    for (let i = 0; i < last_ambs.length; i++)
    {
        if (max_cnt < cnt[last_ambs[i][1]])
        {
            max_cnt = cnt[last_ambs[i][1]];
            max_src = last_ambs[i][1];
            max_sent = last_ambs[i][2];
            max_sent_id = last_ambs[i][3];
        }
    }
    // console.log('sounding', max_src);

    if (max_src !== prev_chosen_amb_src)
    {
        // document.getElementById("tune").pause();
        // document.getElementById("tune").currentTime = 0;
        // document.getElementById("tune").src = max_src;
        // document.getElementById("tune").play();
        new Audio(max_src).play();
        prev_chosen_amb_src = max_src;
        prev_chosen_amb_ts[max_src] = +new Date;
    }
    else if (max_src &&
        max_src === prev_chosen_amb_src &&
        (+new Date) - trans_delay >= prev_chosen_amb_ts[max_src] &&
        !translated_sent[max_sent])
    {
        // console.log('MAX SENT', max_sent);
        ru_to_tat(max_sent, max_sent_id)
        console.log('TRANSLATION', max_sent, '->'); // to pop up
        translated_sent[max_sent] = true;
    }
};