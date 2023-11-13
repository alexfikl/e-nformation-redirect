document.addEventListener("DOMContentLoaded", () => {
    let statusField;
    let universityBox;
    let selectBox;
    let selectRadio;
    let customRadio;

    function initOptions() {
        statusField = document.getElementById("status");
        universityBox = document.getElementById("university_id_box");
        selectBox = document.getElementById("university_id_select");
        selectRadio = document.getElementById("university_select");
        customRadio = document.getElementById("university_custom");
        saveButton = document.getElementById("save_button");

        selectRadio.addEventListener("click", radioOnClick);
        customRadio.addEventListener("click", radioOnClick);
        selectBox.addEventListener("change", selectOnChange);
        saveButton.addEventListener("click", saveOptions);

        restoreOptions();
    }

    function saveOptions() {
        browser.storage.sync.set({ university_id: universityBox.value }, () => {
            // Update status to let user know options were saved.
            statusField.innerHTML = "Options Saved.";
            setTimeout(() => {
                statusField.innerHTML = "";
            }, 2000);
        });
    }

    function restoreOptions() {
        browser.storage.sync.get({ university_id: null }, (items) => {
            const university_id = items.university_id;

            if (university_id) {
                universityBox.value = university_id;
                selectBox.value = university_id;
                if (selectBox.value === university_id) {
                    selectRadio.checked = true;
                } else {
                    customRadio.checked = true;
                }
            } else {
                selectRadio.checked = true;
                selectBox.selectedIndex = 0;
            }
            radioOnClick();
            selectOnChange();
        });
    }

    function selectOnChange() {
        if (selectRadio.checked) {
            universityBox.value = selectBox.value;
        }
    }

    function radioOnClick() {
        selectBox.disabled = !selectRadio.checked;
        universityBox.disabled = selectRadio.checked;
    }

    initOptions();
});
