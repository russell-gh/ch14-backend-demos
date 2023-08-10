const login = (emailTempToken) => {
  return {
    subject: `Confirm login`,
    htmlContent: `<main>
                <section>
                    <h1>Confirm Login</h1>
                    <a href="http://localhost:6001/account/validate?${emailTempToken}">Click me</a>
                </section>
            </main>`,
  };
};

const register = () => {
  return {
    subject: `Welcome`,
    htmlContent: `<p>Welcome, enjoy!</p>`,
  };
};

module.exports = { login, register };
