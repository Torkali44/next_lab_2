export function serializeProps(props) {
  return JSON.parse(
    JSON.stringify(props, (_, value) => (value === undefined ? null : value))
  );
}

export function serializeSession(session) {
  if (!session) return null;

  return {
    user: {
      name: session.user?.name ?? null,
      email: session.user?.email ?? null,
      image: session.user?.image ?? null,
    },
    expires: session.expires ?? null,
  };
}
