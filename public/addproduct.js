*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',sans-serif;
}

body{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;

    /* Beautiful gradient */
    background:linear-gradient(
        135deg,
        #667eea 0%,
        #764ba2 30%,
        #6dd5ed 70%,
        #2193b0 100%
    );
}

.container{
    width:430px;
    padding:35px;
    background:#ffffff;
    border-radius:18px;
    box-shadow:0 20px 40px rgba(0,0,0,0.25);
}

h2{
    text-align:center;
    color:#333;
    margin-bottom:25px;
    font-size:30px;
}

label{
    display:block;
    margin-top:18px;
    margin-bottom:8px;
    font-weight:600;
    color:#444;
}

input{
    width:100%;
    padding:13px;
    border:2px solid #ddd;
    border-radius:10px;
    font-size:16px;
    transition:.3s;
}

input:focus{
    border-color:#667eea;
    box-shadow:0 0 10px rgba(102,126,234,.4);
    outline:none;
}
button{
    width:100%;
    margin-top:30px;
    padding:14px;
    border:none;
    border-radius:12px;

    background:linear-gradient(
        90deg,
        #ff512f,
        #dd2476
    );

    color:white;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;

    transition:.35s;
    box-shadow:0 10px 25px rgba(221,36,118,.35);
}

button:hover{
    transform:translateY(-4px);
    box-shadow:0 15px 35px rgba(221,36,118,.5);
}

button:active{
    transform:scale(.97);
}
