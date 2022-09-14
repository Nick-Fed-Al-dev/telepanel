
// функция возвращает обьект с темой письма и разметкой
export const activationMail = (link : string) => ({
    title: "",
    markup: `
        <div>
            Для активации аккаунта перейдите по ссылке ${link}
        </div>
    `
})