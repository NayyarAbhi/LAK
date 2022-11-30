class prospectDetails{
    constructor(ProspectId,Cookie,SessionId,OtpEmailId,DomusCookieId,CustomerId,IBLogon){
        this.ProspectId=ProspectId;
        this.Cookie=Cookie;
        this.SessionId=SessionId;
        this.OtpEmailId=OtpEmailId;
        this.DomusCookieId=DomusCookieId;
        this.CustomerId=CustomerId;
        this.IBLogon=IBLogon;
    }
}

module.exports = prospectDetails;