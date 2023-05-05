import { component$, $, useContext } from "@builder.io/qwik";
import { auth } from "~/utils/firebase";
import { UserInformationContext } from "~/root";

export default component$(() => {
  const currentUser = useContext(UserInformationContext);

  const logout = $(() => {
    currentUser.email = "";
    currentUser.isLogged = false;
    auth.signOut();
  });

  return (
    <>
      {currentUser.isLogged && (
        <button
          type="button"
          class="btn btn-delete md:ml-4 md:static absolute bottom-4"
          onClick$={logout}
        >
          Logout
        </button>
      )}
    </>
  );
});
