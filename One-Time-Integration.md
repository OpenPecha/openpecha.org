# HOW-TO: Integration Between Github and Transifex

Assuming you already have Github, Discord, and Transifex accounts. Proceed with the following steps.

## Step-by-Step Instructions

1) Start by going to [this address](https://github.com/apps/transifex-integration/installations/new)

**NOTE:** In the above step, there is nothing else to do than just make sure you choose the correct organization from the selection. 

2) Having then as a result ended up on page _Install Transifex Integration_ make sure `All repositories` is selected, and then click `Install`.
3) This will take you to a page in Transifex, where you have to choose one project 

**NOTE:** i.e. you have to have at least one project setup already in Transifex, but it can be empty.

4) On the next page, click `Authorize`.
5) On the next page, make sure to select the Github organization you had created, and click `Authorize`.
6) On the next page, `Link Repository`.
7) On the next page, select the repository you want to connect from the dropdown menu under `Transifex will pull content from this repository`. Then select transifex from the drop down under `The integration will work with this branch only`. Then click `Next`.
8) On the next page, select `Add a path to your YAML configuration file` and type `transifex.yml` in the text field, click `Apply` and once it has completed processing, click `Next`.
9) On the next page, set `When would you like Transifex to push content?` to `Custom` and set value to 1% translated. Then set `How would you like Transifex to push translations to GitHub?` to `Commit directly`. Click `Save & Sync`.
