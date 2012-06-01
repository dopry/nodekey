I'm a paranoid sysadmin. I generate RSA keypairs for each service and device combination I 
have. I prefer that my users use a Key that I have signed with my own CA or another CA I trust.
I also expect CA's to quickly revoke all certificates signed with a compromised signing key.

Managing a lot of keys in a very paranoid PKI infrastructure can be difficult. 

Above and beyond my curmudgeonly mindset it should be easy for most developers to click a button
and have a certificate and not have to worry about running openssl on the cli to generate key pairs
for services. They should have to click a button to generate their private key and get a prompt asking
them where to save it. Their public key once approved should automatically be associated with their 
account.



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
      status: [ pending, signed ] 
    }
    
    Certificate (public) {
      csr: (reference)
      key: {long ass string}
      status: [ active, revoked ]
      lastModified: { datetime }
    }
    
    
REST API
    
    /v1/csrs
        Description:
            Base UI for submitting and retrieving Certificate Signing Requests.
        
        Entities:
        
    
        Methods:
            POST: submit a csr for signing, return it's @id.
            GET: retrieve a list of csrs
            PUT: N/A no mass update
            DELETE: N/A no mass delete
    
    /v1/csrs/@id
        Description:
            Base URI for managing a specific CSR.
            
        Entities:
            
        Methods:
            POST: submit a csr for signing to a specific @id.
            GET: Return a CSR and it's details.
            PUT: 
            DELETE: N/A no deleting
    
    /v1/certificates
        Description:
            Base URI for managing certificates.
        
        Entities:
        
        Methods:
            POST: put a CSR to create a signed certificate. 
            GET: get a list of known public certificates.
            PUT: N/A no mass update.
            DELETE: N/A no mass delete.
    
    /v1/certificates/@id        
        Methods:
            POST: put a CSR to create a signed certificate.
            GET: get the details of the signed certificate.
            PUT: use put to set the certificate to revoked.
            DELETE: revoke a certificate
    
    /v1/signing-certificate
        
        Description:
            URI for managing the signing ceritificate.  This is typically a cert 
            signed by a root certificate, used for signing end user certificates.
        
        Methods:
            POST: submit a new signing certificate
            GET: get the signing certificate details
            PUT: not applicable.
            DELETE: remove the signing certificate.        

    /v1/ca
        Description:
            Public URI for the CA certificate. This is typically the CA cert for the Root Certificate.
            
        Methods:
            POST: upload a new public CA certificate.
            GET: get a copy of the CA certificate.
            PUT: update the CA certificate.
            DELETE: delete the CA certificate.
        
    
    

Errata:

    http://middleware.internet2.edu/pki03/presentations/11.pdf