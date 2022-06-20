
const database = require(path.join(__dirname, "gifs_database.json"))

function goodFileExtension(file_arg)
{
    let extension = file_arg[file_arg.length-1].split('.')[1]

    return extension == 'gif' || extension == 'png' || extension =='jpg'
}

function checkGifTag(gif, user_message_arg)
{
    let numberTagFound = 0
    for(let j = 0; j < user_message_arg.length; j++)
    {
        var topic = user_message_arg[j]
        //console.log(topic)
        let tags = database["gifs"][gif]
        //console.log(tags)

        if(tags.includes(topic))
        {
            numberTagFound++;
        }
    }
    return numberTagFound == user_message_arg.length
}

function getGifsWithTopic(user_message_arg)
{
    var gifs_key = Object.keys(database["gifs"])

    for(let i = 0; i < gifs_key.length; i++)
    {
        let gif = gifs_key[i]
        //console.log(gif)

        let tag_include = checkGifTag(gif, user_message_arg)

        if(!tag_include)
        {
            //console.log("remove: " + gif)
            gifs_key.splice(i, 1)
            i--;
        }
    }
    //console.log(gifs_key)    
    return gifs_key
}

function getAllGifs()
{
    var select_gifs = fs.readdirSync(GIFS_PATH)
    
    for( var i = 0; i < select_gifs.length; i++)
    {             
        let file_arg = select_gifs[i].split('-')  
        let file_size_MB = fs.statSync(GIFS_PATH + select_gifs[i]).size / 1000000.0

        if ( file_size_MB > 8 && goodFileExtension(file_arg)) 
        { 
            console.log("Found heavy file: "+ select_gifs[i] + "\tsize: " + file_size_MB)
            select_gifs.splice(i, 1); 
            i--; 
        }
        else if(!goodFileExtension(file_arg))
        {
            select_gifs.splice(i, 1); 
            i--; 
        }
    }
    return select_gifs
}

function getGIF(user_message_arg)
{
    if(user_message_arg[0] == 'random')
    {
        let selectedGifs = getAllGifs()
        if(selectedGifs.length > 0)
        {
            return selectedGifs[Math.floor(Math.random() * selectedGifs.length)]
        }
    }
    else
    {
        let selectedGifs = getGifsWithTopic(user_message_arg)
        if(selectedGifs.length > 0)
        {
            return selectedGifs[Math.floor(Math.random() * selectedGifs.length)]
        }
    }
    return undefined
}

function getGIFSTags()
{
    var topics = new Array()
    topics.push('random')

    var gifs_key = Object.keys(database["gifs"])

    for( var i = 0; i < gifs_key.length; i++)
    {
        let tags = database["gifs"][gifs_key[i]]

        for(let j = 0; j < tags.length; j++)
        {
            if(!topics.includes(tags[j]))
            {
                topics.push(tags[j])
            }
        }
    }
    return topics
}