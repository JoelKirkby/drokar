import setuptools
from setuptools import find_packages

setuptools.setup(
    package_dir={"": "src"},
    packages=find_packages(where='src'), 
    python_requires=">=3.8",

)
