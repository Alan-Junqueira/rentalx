# Cadastro de carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar um novo carro.

**RNF** ==> Requisitos não funcionais


**RN** ==> Regras de negócio

- Não deve ser possível cadastrar um carro com uma placa já existente.
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

**RNF** ==> Requisitos não funcionais.


**RN** ==> Regras de negócio

- Não deve ser possível cadastrar uma especificação para um carro inexistente.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável por cadastrar de especificação, deve ser um administrador.

# Cadastro de imagens do carro

**RF** ==> Requisitos funcionais

- Deve ser possível cadastrar a imagem do carro.

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
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução do carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
- Se o carro for devolvido em menos de 24h, deverá ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de Alugueis para usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
- O usuário deve estar logado na aplicação.