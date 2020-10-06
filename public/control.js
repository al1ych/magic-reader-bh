function on_dblclick(e)
{
    if ($("#webgazerGazeDot").css('visibility') === 'visible')
    {
        $("#webgazerGazeDot").css('visibility', 'hidden');
    }
    else
    {
        $("#webgazerGazeDot").css('visibility', 'visible');
    }
}

function on_key(e)
{
    if (e.keyCode === 40) // down
        offset_y += OFFSET_PART_Y;
    if (e.keyCode === 38) // up
        offset_y -= OFFSET_PART_Y;
    if (e.keyCode === 37) // left
        offset_x -= OFFSET_PART_X;
    if (e.keyCode === 39) // right
        offset_x += OFFSET_PART_X;
    console.log(offset_x, offset_y);
}

document.addEventListener("dblclick", on_dblclick);

document.addEventListener("keydown", on_key);
