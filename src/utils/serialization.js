export default class Serializer {
    static save(blob, filename) {

        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);

        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    static readJson() {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            input.type = 'file'
            input.onchange = function (e) {
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.onload = function (e) {
                    const json = JSON.parse(e.target.result)
                    resolve(json)
                }
                reader.readAsText(file)
            }
            input.click()
        })
    }
}