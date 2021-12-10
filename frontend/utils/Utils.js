export function slugify(string) {
    return [...string]
        .map((letter, index) => {
            const code = letter.charCodeAt(0)
            if ((code >= 65 && code <= 90) && string[index - 1]) {
                return `-${letter.toLowerCase()}`
            }

            return letter.toLowerCase()
        })
        .join('')
}