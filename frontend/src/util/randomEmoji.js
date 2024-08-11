const emojis = [
    '🦞',
    '🐯',
    '🦥',
    '🐨',
    '🙊',
    '🐥',
    '🐴',
    '🐛',
    '🐙',
    '🐼',
]

const getRandom = () => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    return emoji
}

export { getRandom }

