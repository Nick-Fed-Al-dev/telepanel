import {io} from "../start"
import {SocketEvents} from "../../modules/types/SocketEvents"
import {AccountService} from "./account.service"
import {AuthAccountDto} from "./dto/auth-account.dto"
import {ApiResponse} from "../../modules/ApiResponse";

const accountNamespace = io.of("/account")

accountNamespace.on(SocketEvents.connect, (socket) => {

    socket.on(SocketEvents.send_code, async (accountId : number) => {
        const sendCodeData = await AccountService.sendCode(accountId)

        const authAccountDto = new AuthAccountDto(sendCodeData)

        socket.authAccountDto = authAccountDto

        const response = ApiResponse.ok("code sent")

        accountNamespace.emit(SocketEvents.send_code, response)
    })

    socket.on(SocketEvents.login_account, async (code : number) => {
        socket.authAccountDto.code = code

        const entityAccountDto = await AccountService.loginAccount(socket.authAccountDto)

        const response = ApiResponse.created("account authorized", entityAccountDto)

        accountNamespace.emit(SocketEvents.login_account, response)
    })

})