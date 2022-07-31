import dotenv from 'dotenv';
import log4js from 'log4js'

dotenv.config();

log4js.configure({
    appenders:{
       consola:{type:'console',level:'info'},
       warnFile:{type:'file',filename:'./logger/warnFile.log'},
       errorFile:{type:'file',filename:'./logger/errorFile.log'},
       warnFileLevel:{type:'logLevelFilter',appender:'warnFile',level:'warn'},
       errorFileLevel:{type:'logLevelFilter',appender:'ErrorFile',level:'error'}
    },
    categories:{
        default:{
            appenders:['consola','warnFileLevel','errorFileLevel'],level:'all'
        },
        prod:{
            appenders:['warnFileLevel','errorFileLevel'],level:'all'
        }
    }
})

let logger=null
if(process.env.NODE_ENV==='PROD'){

    logger=log4js.getLogger('prod')

}else{

    logger=log4js.getLogger() //Si no ponemos nada es default
}

export default logger

