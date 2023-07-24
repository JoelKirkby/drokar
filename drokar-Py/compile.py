import setuptools
from Cython.Build import cythonize

# Replace package name here
package_name = "drokar"

# Python modules to be included as source code in the whl package file
include_as_py = [f"{package_name}.__init__"]

# Python files to be exculded from compilation. This should include all modules that are listed above
exlcude_compilation = [f"src/{package_name}/__init__.py"]

# Python files to be compiled and included in the whl package file
compiled_module_list = [f"src/{package_name}/*.py"]

setuptools.setup(
    name=package_name,
    package_dir={"": "src"},
    packages=[f"{package_name}.data", f"{package_name}.assets"],
    py_modules=include_as_py,
    python_requires=">=3.8",

    options={'build':{'build_lib':f"build\\{package_name}_lib" }},

    package_data={
        f"{package_name}.data":["*"],
        f"{package_name}.assets":["*"],
    },
    
    ext_modules = cythonize(module_list= compiled_module_list, 
                            exclude=exlcude_compilation, 
                            compiler_directives={'language_level' : "3", 'annotation_typing': False}, 
                            build_dir=f"build\\{package_name}" 
                            )
)
