# Cadastro de carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar um novo carro.

**RNF** ==> Requisitos não funcionais


**RN** ==> Regras de negócio

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado, por padrão, com disponibilidade ativa.
- O usuário responsável por cadastrar um carro, deve ser um administrador.

# Listagem de carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RNF** ==> Requisitos não funcionais.


**RN** ==> Regras de negócio
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RNF** ==> Requisitos não funcionais.


**RN** ==> Regras de negócio

- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável por cadastrar de especificação, deve ser um administrador.

# Cadastro de imagens do carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF** ==> Requisitos não funcionais

- Utilizar o multer para o upload dos arquivos.

**RN** ==> Regras de negócio.

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável por cadastrar de especificação, deve ser um administrador.

# Aluguel de carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar um aluguel

**RNF** ==> Requisitos não funcionais

- Utilizar o multer para o upload dos arquivos.

**RN** ==> Regras de negócio.

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro.