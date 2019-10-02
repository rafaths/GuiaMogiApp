function fotoUsuario(){
    
    var opFoto = {
    quality:50,
    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType:Camera.DestinationType.FILE_URI,
    mediaType:Camera.MediaType.PICTURE
    }
            
    navigator.camera.getPicture(fotousuarioSucesso,fotousuarioErro, opFoto);
}               

function fotousuarioSucesso(foto){
    localStorage.setItem('foto',foto);
    $("#fotoUsuario").html("<img src='" + foto + "' width=144px height=144px>");    
    nomeFoto();             
}
                        
function fotousuarioErro(e) {
    navigator.notification.alert('Houve um erro ao tentar acessar a galeria! Tente Novamente!','','Erro');
}


function nomeFoto() {
    var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var nomeFoto = '';
    for (var i = 0; i < 55; i++) {
        var rnum = Math.floor(Math.random() * letras.length);
        nomeFoto += letras.substring(rnum, rnum + 1);
    }

    localStorage.setItem('nomeFoto',nomeFoto+'.jpg');
}

 
function cadastrarUsuario(){
    
    var foto = localStorage.getItem('foto');

    //console.log($("#nome").val());
    //navigator.notification.alert('Informe o nome da empresa!!','','Erro');

    if($("#nome").val()==""){        
      $("#informeNome").html('Informe um nome!');
      $("#nome").focus();         
    }else if($("#usuario").val()=="") {
      $("#informeUsuario").html('Informe um nome de usuario!');
      $("#usuario").focus();
    }else if($("#email").val()==""){
      $("#informeEmail").html('Informe um email');
      $("#email").focus();
    }else if($("#cpf").val()==""){
      $("#informeCpf").html('Informe um CPF');
      $("#cpf").focus();
    }else if($("#cep").val()==""){
      $("#informeCep").html('Informe um CEP');
      $("#cep").focus();
    }else if($("#rua").val()==""){
      $("#informeRua").html('Informe a rua');
      $("#rua").focus();
    }else if($("#bairro").val()==""){
      $("#informeBairro").html('Informe o bairro');
      $("#bairro").focus();
    }else if($("#cidade").val()==""){
      $("#informeCidade").html('Informe a cidade');
      $("#cidade").focus();
    }else if($("#uf").val()==""){
      $("#informeUf").html('Informe a UF');
      $("#uf").focus();
    }else if($("#nr_end").val()==""){
      $("#informeNumero").html('Informe o numero da residencia');
      $("#nr_end").focus();
    }else if($("#senha").val()==""){
      $("#informeSenha").html('Informe uma senha!');
      $("#senha").focus();
    }else if($("#conf_senha").val()=="" || $("#senha").val() !== $("#conf_senha").val()){
      $("#confSenha").html('Senhas não são iguais!');
      $("#conf_senha").focus();
    }else if(foto==null){
      navigator.notification.alert('Favor selecionar uma foto de perfil!!','','Alerta');
    }else{
        
         var nomeFoto = localStorage.getItem('nomeFoto');         

         var options = new FileUploadOptions();
         options.fileKey = "file";
         options.fileName = nomeFoto;
         options.mimeType = "image/jpeg";

         var params = new Object();
         params.value1 = $("#nome").val();
         params.value2 = $("#usuario").val();
         params.value3 = $("#senha").val();         
         params.value4 = $("#email").val();
         params.value5 = $("#cpf").val();
         params.value6 = $("#cep").val();
         params.value7 = $("#rua").val();
         params.value8 = $("#bairro").val();
         params.value9 = $("#cidade").val();
         params.value10 = $("#uf").val();
         params.value11 = $("#nr_end").val();         
         options.params = params;
         options.chunkedMode = false;

        var ft = new FileTransfer();
          ft.upload(foto, "http://rafaths.com.br/guiamogiapp_crud/insereUsuario.php", function(){
             
            navigator.notification.alert('Cadastro efetuado com sucesso!!','','Mensagem');             
             
            localStorage.removeItem('nomeFoto');
            localStorage.removeItem('foto');
            window.location.href="index.html";
            return false;
         }, function(){
             navigator.notification.alert('Houve um erro ao tentar publicar! Tente Novamente!','','Erro');

         }, options);
        }        
}

function verificaUsuario(){    
  $.ajax({
      url:'http://rafaths.com.br/guiamogiapp_crud/consulta_usuario.php',
      dataType:'json',
      type:'POST',
      data:{usuario: $("#nome_usuario_login").val(),
            senha: $("#senha_login").val()},
      success:function(r){
          if (r.Resp==0) {
              navigator.notification.alert('Usuário e/ou senha não encontrados!!','','Mensagem');
          }
          
          else if(r.Resp==1){
              localStorage.setItem('usr_id',r.usr_id);
              localStorage.setItem('usr_nome',r.usr_nome);
              localStorage.setItem('usr_email',r.usr_email);
              localStorage.setItem('usr_foto',r.usr_foto);
              localStorage.setItem('usr_nivel',r.usr_nivel);
              localStorage.setItem('usr_status',r.usr_status);
              
              window.location.href="index.html";
              return false;  
              
          }
      },
      error:function(e){
          navigator.notification.alert('Houve um erro de conexão com o banco de dados!!','','Erro');
      }
  })    
}

function sair(){    
    navigator.notification.confirm(
    'Deseja sair?',
    respostaSair,
    'Sair',
    ['Não','Sim']
    )
    
}
function respostaSair(r){    
    if (r==2) {        
        localStorage.clear();
        window.location.href="index.html";
        return false; 
    }    
}

function fotoEmpresa(){
    
    var opFoto = {
    quality:50,
    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType:Camera.DestinationType.FILE_URI,
    mediaType:Camera.MediaType.PICTURE
    }
            
    navigator.camera.getPicture(fotoempresaSucesso,fotoempresaErro, opFoto);
}               

function fotoempresaSucesso(foto){
    localStorage.setItem('foto',foto);
    $("#fotoEmpresa").html("<img src='" + foto + "' width=144px height=144px>");
    nomeFoto();             
}
                        
function fotoempresaErro(e) {
    navigator.notification.alert('Houve um erro ao tentar acessar a galeria! Tente Novamente!','','Erro');
}

function cadastrarEmpresa(){

	var foto = localStorage.getItem('foto');

    if($("#nome_empresa").val()==""){        
      $("#informeEmpresa").html('Infome o nome da empresa!');
      $("#nome_empresa").focus();         
    }else if($("#descricao").val()=="") {
      $("#informeDescricao").html('Informe uma descrição da empresa!');
      $("#descricao").focus();
    }else if($("#categoria").val()==""){
      $("#selecioneCategoria").html('Selecione uma categoria');
      $("#categoria").focus();
    }else if($("#email").val()==""){
      $("#informeEmail").html('Informe o email da empresa');
      $("#email").focus();
    }else if($("#cep").val()==""){
      $("#informeCep").html('Informe um CEP');
      $("#cep").focus();
    }else if($("#rua").val()==""){
      $("#informeRua").html('Informe a rua');
      $("#rua").focus();
    }else if($("#bairro").val()==""){
      $("#informeBairro").html('Informe o bairro');
      $("#bairro").focus();
    }else if($("#cidade").val()==""){
      $("#informeCidade").html('Informe a cidade');
      $("#cidade").focus();
    }else if($("#uf").val()==""){
      $("#informeUf").html('Informe a UF');
      $("#uf").focus();
    }else if($("#nr_end").val()==""){
      $("#informeNumero").html('Informe o numero da residencia');
      $("#nr_end").focus();
    }else if(foto==null){
      navigator.notification.alert('Favor selecionar uma foto de logotipo da empresa!!','','Alerta');
    }else{

         var nomeFoto = localStorage.getItem('nomeFoto');         

         var options = new FileUploadOptions();
         options.fileKey = "file";
         options.fileName = nomeFoto;
         options.mimeType = "image/jpeg";

         var params = new Object();
         params.value1 = $("#nome_empresa").val();
         params.value2 = $("#descricao").val();
         params.value3 = $("#categoria").val();
         params.value4 = $("#email").val();
         params.value5 = $("#telefone").val();
         params.value6 = $("#celular").val();
         params.value7 = $("#cep").val();
         params.value8 = $("#rua").val();
         params.value9 = $("#bairro").val();
         params.value10 = $("#cidade").val();
         params.value11 = $("#uf").val();
         params.value12 = $("#nr_end").val();         
         params.value13 = $("#facebook").val();
         params.value14 = $("#whatsapp").val();
         params.value15 = $("#instagram").val();
         params.value16 = $("#usr_id").val();

         options.params = params;
         options.chunkedMode = false;

         var ft = new FileTransfer();
         ft.upload(foto, "http://rafaths.com.br/guiamogiapp_crud/insereEmpresa.php", function(){

            navigator.notification.alert('Cadastro efetuado com sucesso!!','','Mensagem');             

            localStorage.removeItem('nomeFoto');
            localStorage.removeItem('foto');
            window.location.href="minhasempresas.html";
            return false;
         }, function(){

             navigator.notification.alert('Houve um erro ao tentar cadastrar a empresa! Tente Novamente!','','Erro');

         }, options);
    }

}









function cadastrarFavorito(){
    var empresa = $("#empr_id").val();
    var usuario = $("#usr_id").val();
    $.ajax({
        url:'http://rafaths.com.br/guiamogiapp_crud/insereFavorito.php',
        dataType:'text',
        type:'POST',
        data:{usuario: usuario,
              empresa: empresa
        },
        success:function(data){
          if(data=="insertsuccess"){
            navigator.notification.alert('Favoritos adicionado com sucesso!!','','Mensagem');   
          }else if(data=="deletesuccess"){
            navigator.notification.alert('Favoritos removido com sucesso!!','','Mensagem');
          }
                   
        },
        error:function(){
          navigator.notification.alert('Houve um erro de conexão com o banco de dados!!','','Erro');
        }
    })    
}

function cadastrarAvaliacao(){
    var id_usuario = $("#usr_id").val();
    var id_empresa = $("#empr_id").val();
    var aval_atendimento = $("#atendimento").attr("data-rate-value");
    var aval_preco = $("#preco").attr("data-rate-value");
    var aval_qualidade = $("#qualidade").attr("data-rate-value");
    var aval_comentario = $("#comentario").val(); 

    console.log(id_usuario);
    console.log(aval_atendimento);
    console.log(aval_preco);
    console.log(aval_qualidade);   

    $.ajax({
        url:'http://rafaths.com.br/guiamogiapp_crud/insereAvaliacao.php',
        dataType:'text',
        type:'POST',
        data:{id_usuario: id_usuario,
              id_empresa: id_empresa,
              aval_atendimento: aval_atendimento,
              aval_preco: aval_preco,
              aval_qualidade: aval_qualidade,
              aval_comentario: aval_comentario
        },
        success:function(data){
          if(data=="insertsuccess"){
            navigator.notification.alert('Avaliação adicionada com sucesso!!','','Mensagem');
            window.history.back();
            return false;    
          }else if(data=="insertfail"){
            navigator.notification.alert('Você já avaliou essa empresa!!','','Mensagem');
            window.history.back();
          }
                   
        },
        error:function(){
          navigator.notification.alert('Houve um erro de conexão com o banco de dados!!','','Erro');
        }
    })    
}


