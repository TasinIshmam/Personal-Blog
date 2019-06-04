
const logLevels = {
    error : 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug : 4
}



const logger = {
    currentLevel : process.env.NODE_ENV === "production" ? 2 : 4,
    log : function (level, messageObj) {
        if(logLevels[level]  <= this.currentLevel) {
            console.log(`${level}: `, messageObj);
        }

    },

    print : function (level, messageObj) {
        this.log(level, messageObj)
    },
    error : function (messageObj) {
        this.log("error", messageObj);
    },
    warn : function (messageObj) {
        this.log("warn", messageObj);
    },
    info : function (messageObj) {
        this.log("info", messageObj);
    },
    verbose : function (messageObj) {
        this.log("verbose", messageObj);
    },
    debug : function (messageObj) {
        this.log("debug", messageObj);
    },

}


logger.debug("Starting up logger");

module.exports = {logger}
