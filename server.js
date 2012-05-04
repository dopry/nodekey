
// this should provide a restful api for interacting with a 
// signing authority.

/*
    user stories:
    A. A user of a cloud service wants to create an ssh key to use with said service in a secure method.
    B. Cloud service provider want a simple way to authorize and verify client certificates while 
       providing them secure ways to interact with their services.
    
    How To:
    A. To create a certificate securely a user needs to generate a 2048bit private and csr on their computer. Never exposing their
    private key. The CSR is then submitted to the CA. Wait for the CA to validate them and provide them a signed
    public certificate.
    see: https://knowledge.geotrust.com/support/knowledge-base/index?page=content&id=AR876
    
    B. Service providers establish a CA signing hierarchy with a Root Certificate and a signing Certificate. They present an service
    to which clients can upload CSRs. The service can utilize a number of verification schemes. I'm currently thinking manual, email, 
    or phone validation. Once validated the submitting client can be notified. The CA's service should provide all the tools the end
    needs to generate their certificate.
    
    Dream Workflow:
    
    I signup for the awesome web service. On my account page it prompts me to generate a key to access their site.
    I hit the generate key button in my browser and I'm prompted to save my private key. In the background my CSR 
    has been submitted to the server already. The server is sending me an email to verify that I uploaded the key 
    to the account I setup my email with, or giving me a ring on my phone and asking me to verify. Once I verify 
    my public key is auto loaded in my profile and I have the option to download it. 
    
    Libraries needed:
    
    npm install ursa
    
    
    Entities:
    
    CSR {
      DistinguishedName: '',
      Organisation: '',
      OrganisationalUnit: '',
      City: '',
      State: '',
      Country: '',
      Email: '',
      PublicKey, '',
    
    }
    Certificate (public) {
      csr: (reference)
      key: {long ass string}
      status: [ pending, active, revoked ]
      lastModified: { datetime }
    }
    
    
    rest api

    uri:
    /v1/csrs
        POST: submit a csr for signing, return it's @id.
        GET: retrieve a list of csrs
        PUT: N/A no mass update
        DELETE: N/A no mass delete
    /v1/csrs/@id
        POST: submit a csr for signing to a specific @id.
        GET: Return a CSR and it's details.
        PUT: 
        DELETE: N/A no deleting
    /v1/certificates
        POST: put a CSR to create a signed certificate. 
        GET: get a list of known public certificates.
        PUT: N/A no mass update.
        DELETE: N/A no mass delete.
    /v1/certificates/@id        
        POST: put a CSR to create a signed certificate.
        GET: get the details of the signed certificate.
        PUT: use put to set the certificate to revoked.
        DELETE: if you really want to
    

*/

var express = require('express');
var app = module.exports = express.createServer();
var viewEngine = 'jade'; // modify for your view engine


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', viewEngine);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
    res.render('publicKeyForm.jade', { title: 'My Site' });
});

app.get('/ajax/publicKey', function(req, res){
    res.partial('publicKeyForm.jade', { title: 'My Site' });
});

app.listen(Number(process.env.PORT || PORT));



// *******************************************************

