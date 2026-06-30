import os
from pathlib import Path

def create_project_structure(base_path: Path, structure: dict):
    """
    Recursively creates folders and files based on a dictionary structure.
    """
    for name, content in structure.items():
        current_path = base_path / name
        
        try:
            if isinstance(content, dict):
                # If the content is a dictionary, create a folder
                current_path.mkdir(parents=True, exist_ok=True)
                # Recursively build the contents of this folder
                create_project_structure(current_path, content)
            else:
                # Otherwise, treat it as a file
                current_path.parent.mkdir(parents=True, exist_ok=True)
                current_path.touch(exist_ok=True)
                
                # Write initial content to the file if provided
                if content:
                    current_path.write_text(content, encoding='utf-8')
        except PermissionError:
            print(f"❌ Permission Denied: Cannot create '{current_path}'. Try running as Administrator.")
        except Exception as e:
            print(f"❌ Error creating '{current_path}': {e}")

# The exact folder and file structure extracted from your images
my_structure = {
    ".lovable": {
        "project.json": ""
    },
    "src": {
        "components": {
            "ui": {
                "accordion.tsx": "",
                "alert-dialog.tsx": "",
                "alert.tsx": "",
                "aspect-ratio.tsx": "",
                "avatar.tsx": "",
                "badge.tsx": "",
                "breadcrumb.tsx": "",
                "button.tsx": "",
                "calendar.tsx": "",
                "card.tsx": "",
                "carousel.tsx": "",
                "chart.tsx": "",
                "checkbox.tsx": "",
                "collapsible.tsx": "",
                "command.tsx": "",
                "context-menu.tsx": "",
                "dialog.tsx": "",
                "drawer.tsx": "",
                "dropdown-menu.tsx": "",
                "form.tsx": "",
                "hover-card.tsx": "",
                "input-otp.tsx": "",
                "input.tsx": "",
                "label.tsx": "",
                "menubar.tsx": "",
                "navigation-menu.tsx": "",
                "pagination.tsx": "",
                "popover.tsx": "",
                "progress.tsx": "",
                "radio-group.tsx": "",
                "resizable.tsx": "",
                "scroll-area.tsx": "",
                "select.tsx": "",
                "separator.tsx": "",
                "sheet.tsx": "",
                "sidebar.tsx": "",
                "skeleton.tsx": "",
                "slider.tsx": "",
                "sonner.tsx": "",
                "switch.tsx": "",
                "table.tsx": "",
                "tabs.tsx": "",
                "textarea.tsx": "",
                "toggle-group.tsx": "",
                "toggle.tsx": "",
                "tooltip.tsx": ""
            },
            "CourseForm.tsx": "",
            "CourseList.tsx": "",
            "SearchCourse.tsx": ""
        },
        "hooks": {
            "use-mobile.tsx": ""
        },
        "lib": {
            "courses.functions.ts": "",
            "db.server.ts": "",
            "error-capture.ts": "",
            "error-page.ts": "",
            "lovable-error-reporting.ts": "",
            "utils.ts": ""
        },
        "routes": {
            "__root.tsx": "",
            "index.tsx": "",
            "README.md": ""
        },
        "router.tsx": "",
        "routeTree.gen.ts": "",
        "server.ts": "",
        "start.ts": "",
        "styles.css": ""
    },
    ".gitignore": "",
    ".prettierignore": "",
    ".prettierrc": "",
    "AGENTS.md": "",
    "bun.lock": "",
    "bunfig.toml": "",
    "components.json": "",
    "eslint.config.js": "",
    "package.json": "",
    "tsconfig.json": "",
    "vite.config.ts": ""
}

if __name__ == "__main__":
    # FIX: Force the script to build exactly where this Python file is saved
    try:
        base_directory = Path(__file__).parent.resolve()
    except NameError:
        # Fallback if you are running this in an interactive console instead of a script
        base_directory = Path.cwd() 
    
    print(f"Building project structure in: {base_directory}")
    print("Working...")
    
    create_project_structure(base_directory, my_structure)
    
    print("✅ Project structure generated successfully!")