var clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function getEmoji(emojiname)
{
    return client.emojis.cache.find(emoji => emoji.name === emojiname)
}

function removeSpaceInMessage(messageArray)
{
    let array = new Array()
    for(let i = 0; i< messageArray.length; i++)
    {
        if(messageArray[i]!= '')
        {
            array.push(messageArray[i])
        }
    }
    return array
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}