const path = require('path');

var gif_database_path = path.join(__dirname, "gifs_database.json")
var gif_database = require(gif_database_path)

var tag_database_path = path.join(__dirname, "tags.json")
var tag_database = require(tag_database_path)

function checkGifTag(gif, tags)
{
    let numberTagFound = 0
    for(let j = 0; j < tags.length; j++)
    {
        var topic = tags[j]
        let _tags = gif_database["gifs"][gif]

        if(_tags.includes(topic))
        {
            numberTagFound++;
        }
    }
    return numberTagFound == tags.length
}

function getGifsWithTag(tags)
{
    var selecte_gifs = []
    var gifs_key = Object.keys(gif_database["gifs"])

    for(let i = 0; i < gifs_key.length; i++)
    {
        if(checkGifTag(gifs_key[i], tags))
        {
            selecte_gifs.push(gifs_key[i])
        }
    }
    return selecte_gifs
}

function getGIF(user_message_arg)
{
    var tags = []
    for(let i = 0; i< user_message_arg.length; i++)
    {
        let tag = get_tag_parent(user_message_arg[i])
        if(!tags.includes(tag))
        {
            tags.push(tag)
        } 
    }
    let selectedGifs = getGifsWithTag(tags)
    if(selectedGifs.length > 0)
    {
        return selectedGifs[Math.floor(Math.random() * selectedGifs.length)]
    }
    return undefined
}

function get_tag_parent(tag)
{
    var tag_keys = Object.keys(tag_database["tags"])
    for(let i = 0; i < tag_keys.length; i++)
    {
        let tag_parent = tag_database["tags"][tag_keys[i]]
        for(let j = 0; j< tag_parent.length; j++)
        {
            let _tag = tag_parent[j]
            if(_tag == tag)
            {
                return tag_keys[i]
            }
        }
    }
    return tag
}

function getGIFSTags()
{
    return Object.keys(tag_database["tags"])
}


function gifExist(gif)
{
    return gif_database["gifs"][gif] != undefined
}


function SaveDatabase()
{
   /* fs.writeFile(database_path, JSON.stringify(database, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.")
    })*/
}