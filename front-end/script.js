document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    if (!nome || !email || !dataNascimento) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }

    cadastrarUsuario(nome, email, dataNascimento);
  });

function cadastrarUsuario(nome, email, dataNascimento) {
  const usuario = {
    nome: nome,
    email: email,
    dataNascimento: dataNascimento,
  };

  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => response.json())
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      document.getElementById("userForm").reset();

      carregarUsuarios();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    });
}

function carregarUsuarios() {
  fetch("http://localhost:3000/api/users")
    .then((response) => response.json())
    .then((data) => {
      const userList = document.getElementById("userList");
      userList.innerHTML = "";

      data.forEach((user) => {
        const row = document.createElement("tr");

        const nomeTd = document.createElement("td");
        nomeTd.textContent = user.nome;

        const emailTd = document.createElement("td");
        emailTd.textContent = user.email;

        const dataNascimentoTd = document.createElement("td");
        dataNascimentoTd.textContent = user.dataNascimento;

        const acoesTd = document.createElement("td");

        const editarBtn = document.createElement("button");
        editarBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editarBtn.classList.add("btn", "btn-warning", "btn-sm", "me-2");
        editarBtn.title = "Editar usuário";
        editarBtn.onclick = function () {
          abrirModalEdicao(user);
        };

        const excluirBtn = document.createElement("button");
        excluirBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        excluirBtn.classList.add("btn", "btn-danger", "btn-sm");
        excluirBtn.title = "Excluir usuário";
        excluirBtn.onclick = function () {
          excluirUsuario(user.id);
        };

        acoesTd.appendChild(editarBtn);

        acoesTd.appendChild(excluirBtn);

        row.appendChild(nomeTd);
        row.appendChild(emailTd);
        row.appendChild(dataNascimentoTd);
        row.appendChild(acoesTd);

        userList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar usuários:", error);
    });
}

function excluirUsuario(id) {
  if (confirm("Você tem certeza que deseja excluir este usuário?")) {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Usuário excluído com sucesso!");
        carregarUsuarios();
      })
      .catch((error) => {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário. Tente novamente.");
      });
  }
}

function abrirModalEdicao(user) {
  document.getElementById("editarId").value = user.id;
  document.getElementById("editarNome").value = user.nome;
  document.getElementById("editarEmail").value = user.email;
  document.getElementById("editarDataNascimento").value = user.dataNascimento;

  const dataFormatada = user.dataNascimento.split("T")[0];
  document.getElementById("editarDataNascimento").value = dataFormatada;

  const modal = new bootstrap.Modal(
    document.getElementById("modalEditarUsuario")
  );
  modal.show();
}

document
  .getElementById("formEditarUsuario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("editarId").value;
    const nome = document.getElementById("editarNome").value;
    const email = document.getElementById("editarEmail").value;
    const dataNascimento = document.getElementById(
      "editarDataNascimento"
    ).value;

    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, dataNascimento }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Usuário atualizado com sucesso!");
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalEditarUsuario")
        );
        modal.hide();
        carregarUsuarios();
      })
      .catch((error) => {
        console.error("Erro ao atualizar usuário:", error);
        alert("Erro ao atualizar. Tente novamente.");
      });
  });

document.addEventListener("DOMContentLoaded", carregarUsuarios);
