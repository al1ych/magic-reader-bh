function xml2json(xml)
{
    try
    {
        var obj = {};
        if (xml.children.length > 0)
        {
            for (var i = 0; i < xml.children.length; i++)
            {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined")
                {
                    obj[nodeName] = xml2json(item);
                }
                else
                {
                    if (typeof (obj[nodeName].push) == "undefined")
                    {
                        var old = obj[nodeName];

                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        }
        else
        {
            obj = xml.textContent;
        }
        return obj;
    }
    catch (e)
    {
        console.log(e.message);
    }
}

function ru_to_tat(s, w_id)
{
    // 0
    $.ajax({
        url: `https://translate.tatar/translate?lang=0&text=${s}`,
        type: "GET",
        crossDomain: true,
    }).then(
        function success(response)
        {
            console.log('inside ru_to_tat', response, w_id);
            document.getElementById(w_id).innerHTML = response;
            document.getElementById(w_id).css('background: red;')
        },

        function fail(data, status)
        {
            console.log('failed to translate!');
        }
    );
}

function tat_to_ru(s, w_id)
{
    // 1
}