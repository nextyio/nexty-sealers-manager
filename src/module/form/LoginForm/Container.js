import {createContainer, goPath} from "@/util"
import Component from './Component'
import UserService from '@/service/UserService'
import {message} from 'antd'

message.config({
    top: 100
})


export default createContainer(Component, (state)=>{
    return {
        ...state.user.login_form
    }
}, ()=>{
    const userService = new UserService()

    return {
        async decryptWallet(privateKey, contractAdress){
            try {
                const rs = await userService.decryptWallet(privateKey, contractAdress)

                if (rs) {
                    message.success('Login successfully')
                    userService.path.push('/blacklist') //// Redirect page after loged in
                }
            } catch (err) {
                message.destroy()
                message.error(err.message)
            }
        }
    }
})
