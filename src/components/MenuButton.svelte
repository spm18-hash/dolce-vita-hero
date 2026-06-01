<script lang="ts">
    import { isSidebarOpen, sidebar } from "../stores/sidebar-store";

    // $effect runs on the client and automatically tracks dependencies.
    // It will re-run whenever $isSidebarOpen changes.
    $effect(() => {
        const menu = document.getElementById("mobile-menu");

        if (menu) {
            menu.toggleAttribute("data-open", $isSidebarOpen);
        }

        document.body.setAttribute(
            "data-mobile-menu-expanded",
            String($isSidebarOpen),
        );
    });
</script>

<button
    class="group flex items-center gap-5 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-sm cursor-pointer"
    aria-expanded={$isSidebarOpen}
    aria-controls="mobile-menu"
    aria-label="Open Menu"
    onclick={sidebar.toggle}
>
    <svg
        width="46"
        height="24"
        viewBox="0 0 46 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current overflow-visible"
    >
        <line x1="4" y1="10.5" x2="46" y2="10.5" stroke-width="1"></line>
        <line x1="4" y1="16.5" x2="46" y2="16.5" stroke-width="1"></line>
    </svg>
    <span class="text-xl max-md:hidden">Menu</span>
</button>
