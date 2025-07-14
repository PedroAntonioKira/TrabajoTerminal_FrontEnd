export const resendConfirmationCode = async (email) => {
  const respuesta = await fetch(
    'https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/Admin-Resend-ConfirmationCode',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!respuesta.ok) {
    throw new Error('Error en el reenvío');
  }

  return await respuesta.json();
};
