
export const activationMail = (link : string) => ({
    title: "",
    markup: `
        <div>
            Для активации аккаунта перейдите по ссылке ${link}
        </div>
    `
})