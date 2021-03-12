from os import getenv
from typing import List

TOKEN = getenv('TOKEN')
GROUP_ID = getenv('GROUP')
ADMIN_IDS = getenv('ADMIN_IDS')  # comma-separated list
admin_ids: List[int] = list(map(int, ADMIN_IDS.split(",")))  # cast comma-separated list to `List[int]`