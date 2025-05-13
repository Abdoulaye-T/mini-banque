function createBankAccount() {
      let balance = 0;
      let history = [];

      return {
        deposit(amount) {
          if (amount > 0) {
            balance += amount;
            history.push(`Dépôt: ${amount.toFixed(2)} €`);
          }
        },
        withdraw(amount) {
          if (amount > balance) {
            alert("Fonds insuffisants !");
          } else {
            balance -= amount;
            history.push(`Retrait: ${amount.toFixed(2)} €`);
          }
        },
        getBalance() {
          return balance.toFixed(2);
        },
        getHistory() {
          return [...history];
        }
      };
    }

    const account = createBankAccount();

    function getValidatedAmount() {
      const input = document.getElementById("amount").value;
      const amount = parseFloat(input);

      if (!input || isNaN(amount) || amount <= 0) {
        document.getElementById("output").textContent = "Veuillez entrer un montant valide (> 0).";
        return null;
      }
      return amount;
    }
    // Function pour deposer une montant
    function deposit() {
      const amount = getValidatedAmount();
      if (amount !== null) {
        account.deposit(amount);
        document.getElementById("output").textContent = `✅ Dépôt de ${amount.toFixed(2)} € effectué.`;
        document.getElementById("amount").value = "";
      }
    }

    // retirer un montant
    function withdraw() {
      const amount = getValidatedAmount();
      if (amount !== null) {
        if (amount > parseFloat(account.getBalance())) {
          document.getElementById("output").textContent = "❌ Fonds insuffisants pour ce retrait.";
        } else {
          account.withdraw(amount);
          document.getElementById("output").textContent = `✅ Retrait de ${amount.toFixed(2)} € effectué.`;
          document.getElementById("amount").value = "";
        }
      }
    }

    // Voir le solde sur le compte
    function showBalance() {
      document.getElementById("output").textContent = `💰 Solde actuel : ${account.getBalance()} €`;
    }

    // Historique de compte
    function showHistory() {
      const history = account.getHistory();
      document.getElementById("history").innerHTML = history.length
        ? `<strong>📋 Historique :</strong><br>${history.join("<br>")}`
        : "<em>Aucune opération effectuée.</em>";
    }