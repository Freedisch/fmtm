![](images/hot_logo.png)

# Field Mapping Tasking Manager (FMTM)

## History
_How was FMTM born ?_
<br>
<br>
It started due to the efforts of Rob Savoye, Senior Technical Lead at Humanitarian OpenStreetMap Team. HOT uses ODK heavily, but most of the data never makes it into OSM because all the data processing is manual and slow, so it doesn't get done.<img align="right" width="300px" src="https://github.com/hotosm/osm-fieldwork/assets/97789856/afc791c7-6cc9-4496-aa93-ab02733f30b8"/> 
Rob convinced HOT to let him work on this as a small side project. Then Ivan(Senior Humanitarian Advisor at Humanitarian OpenStreetMap Team) heard about what Rob was working on and goes "That's the missing piece I needed!". He'd been wanting to build FMTM for years, but lacked the ability to process the data. He got HOT interested enough to direct some resources to his idea, so FMTM was born.
<!-- <img align="left" width="300px" src="https://github.com/hotosm/osm-fieldwork/assets/97789856/afc791c7-6cc9-4496-aa93-ab02733f30b8"/> -->
_Want to know about OSM-fieldwork project ?_ Click [here](https://github.com/hotosm/osm-fieldwork/wiki) 
<br>
<br>
<br>
<br>
## A project to provide tools for Open Mapping campaigns

The Field Mapping Tasking Manager (FMTM) is a project that aims to provide tools for coordinating field mapping activities in Open Mapping campaigns. While there are existing field mapping applications, there is a lack of efficient tools to coordinate these activities. The FMTM builds on the HOT Tasking Manager and other mapping applications to provide a more streamlined and organized process for completing mapping tasks.

Currently, it is possible to implement a Field Mapping Tasking Manager workflow using existing tools, but it requires significant effort and can be challenging. The FMTM project is developing automation features to address these challenges and make the process more accessible to users.

By providing a centralized platform for organizing and managing mapping tasks, assigning them to specific users, and tracking their progress, the FMTM aims to simplify the coordination of mapping activities. The tool also provides analytics and reporting features, allowing users to gain insights into mapping campaigns and adjust their strategies accordingly.

[Background and description of the project and idea are here: please have a look at this blog if you haven't yet!](https://www.hotosm.org/updates/field-mapping-is-the-future-a-tasking-manager-workflow-using-odk/)

# How to contribute

The FMTM project is open source and community-driven, welcoming contributions from designers, user testers, and both front-end and back-end developers. If you're interested in getting involved, please see our [contributor guidelines](https://github.com/hotosm/fmtm/blob/main/CONTRIBUTING.md) for more information. We welcome questions and feedback, so don't hesitate to reach out to us. 👍🎉

# Using OpenDataKit's Select From Map feature

OpenDataKit's Select From Map feature is a useful tool for field mappers to collect data in a well-structured questionnaire format. The tool was incorporated into ODK in mid-2022 and allows mappers to select an object from a map, view its existing attributes, and fill out a form with new information and attributes.

To prepare map files for ODK, inspiration is taken from the HOT Tasking Manager, which allows remote mappers to choose well-defined small "task" areas, ensuring full coverage of the project area and no unintended duplication of tasks. For example, a mapper can approach a building, select that building from a map view within ODK on their mobile phone, and add the opening hours, number of floors, construction material, or any number of useful attributes in a well-structured questionnaire format

<img src="https://github.com/hotosm/fmtm/blob/main/images/ODK_Select_one_from_file_map_screenshot.jpg?raw=true"  width=800 height= 800>

To prepare the appropriate map files for ODK, we are taking our inspiration from the [HOT Tasking Manager](https://tasks.hotosm.org/), which allows remote mappers to choose well-defined small "task" areas, ensuring full coverage of the project area and no unintended duplication of tasks.

<img src="https://github.com/hotosm/fmtm/blob/main/images/HOT_TM_task_selection_screenshot.jpg?raw=true"  width=800 height= 800>

# Users

There are three main user roles for using ODK's Select From Map feature: campaign managers, field mappers, and validators.

## Campaign managers

Campaign managers select an Area of Interest (AOI) and organize field mappers to go out and collect data. They need to:

- Select an AOI polygon by creating a GeoJSON or by tracing a polygon in a Web map
- Choose a task division scheme (number of features or area per task, and possible variations on what features to use as the preferred splitting lines)
- Provide specific instructions and guidance for field mappers on the project.
- Provide a URL to a mobile-friendly Web page where field mappers can, from their mobile phone, select a task that is not already "checked out" (or possibly simply allocate areas to the field mappers).
- See the status of tasks (open, "checked out", completed but not validated, requires to rework, validated, etc) in the Web browser on their computer

## Field mappers

Field mappers select (or are allocated) individual tasks within a project AOI and use ODK Collect to gather data in those areas. They need to:

- Visit a mobile-friendly Web page where they can see available tasks on a map
- Choose an area and launch ODK Collect with the form corresponding to their allocated area pre-loaded

## Validators

Validators review the data collected by field mappers and assess its quality. If the data is good, the validators merge the portion of the data that belongs in OpenStreetMap to OSM. If it requires more work, the validators either fix it themselves (for minor stuff like spelling or capitalization mistakes that don't seem to be systematic) or inform the field mappers that they need to fix it. They need to:

- Access completed data sets of "submissions" as Comma Separated Values and/or OSM XML so that they can review them.
- Mark areas as validated or requiring rework
- Communicate with field mappers if rework is necessary
- Merge good-quality data into OSM (probably from JOSM).
- Mark areas as completed and merged.

# Info for developers

The basic setup here is:

## ODK Collect

A mobile data collection tool that functions on almost all Android phones. Field mappers use ODK Collect to select features such as buildings or amenities, and fill out forms with survey questions to collect attributes or data about those features (normally at least some of these attributes are intended to become OSM tags associated with those features).

The ODK Collect app connects to a back-end server (in this case ODK Central), which provides the features to be mapped and the survey form definitions.

## ODK Central server

An ODK Central server that functions as the back end for the field data collectors' ODK Collect apps on their Android phones. Devs must have access to an ODK Central server with a username and password granting admin credentials.

[Here are the instructions for setting up an ODK Central server on Digital Ocean](https://docs.getodk.org/central-install-digital-ocean/) (it's very similar on AWS or whatever)

## Field Mapping Tasking Manager Web App

The FMTM web app is a Python/Flask/Leaflet app that serves as a front end for the ODK Central server, using the [ODK Central API](https://odkcentral.docs.apiary.io/#) to allocate specific areas/features to individual mappers, and receive their data submissions.

### Manager Web Interface (with PC browser-friendlymap view)

A computer-screen-optimized web app that allows Campaign Managers to:

- Select AOIs
- Choose task-splitting schemes
- Provide instructions and guidance specific to the project
- View areas that are at various stages of completion
- Provide a project-specific URL that field mappers can access from their mobile phones to select and map tasks.

### FMTM back end

A back end that converts the project parameters entered by the Campaign Manager in the Manager Web Interface into a corresponding ODK Central project. Its functions include:

- Convert the AOI into a bounding box and corresponding Overpass API query
- Download (using the Overpass API) the OSM features that will be mapped in that bounding box (buildings and/or amenities) as well as the OSM line features that will be used as cutlines to subdivide the area
- Trim the features within the bounding box but outside the AOI polygon
- Convert the polygon features into centroid points (needed because ODK select from map doesn't yet deal with polygons; this is likely to change in the future but for now we'll work with points only)
- Use line features as cutlines to create individual tasks (squares don't make sense for field mapping, neighborhoods delineated by large roads, watercourses, and railways do)
- Split the AOI into those tasks based on parameters set in the Manager Web Interface (number of features or area per task, splitting strategy, etc).
- Use the ODK Central API to create, on the associated ODK Central server:
  - A project for the whole AOI
  - One survey form for each split task (neighborhood)
    - This might require modifying the xlsforms (to update the version ID of the forms and change the name of the geography file being referred to). This is pretty straightforward using [OpenPyXL](https://openpyxl.readthedocs.io/en/stable/), though we have to be careful to keep the location within the spreadsheet of these two items consistent.
  - GeoJSON feature collections for each form (the buildings/amenities or whatever)
  - An App User for each form, which in turn corresponds to a single task. When the ODK Collect app on a user's phone is configured to function as that App User, they have access to _only_ the form and features/area of that task.
  - A set of QR Codes and/or configuration files/strings for ODK Collect, one for each App User

### Field Mapper Web Interface (with mobile-friendly map view)

- Ideally with a link that opens ODK Collect directly from the browser, but if that's hard, the fallback is downloading a QR code and importing it into ODK Collect.
