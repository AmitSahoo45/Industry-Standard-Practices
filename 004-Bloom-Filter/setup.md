# Bloom Filter Project Setup

This project implements a simple Bloom filter in Python. Follow the steps below to set up and run the code.

## Prerequisites

- Python 3.x installed on your machine.

## Setup

1. Clone the repository to your local machine:

    ```bash
    git clone <repository name>
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Create and activate a virtual environment:

    ```bash
    # On Windows
    python -m venv venv

    # On macOS/Linux
    python3 -m venv venv

    # Activate the virtual environment
    .\venv\Scripts\activate  # On Windows
    source venv/bin/activate  # On macOS/Linux
    ```

4. Install the required libraries:

    ```bash
    pip install -r requirements.txt
    ```

## Running the Bloom Filter Example

1. Run the Python script:

    ```bash
    python bloom_filter_example.py
    ```

   This will execute the Bloom filter example, and you should see the output indicating whether each item may exist in the set or definitely does not exist.

2. Deactivate the virtual environment when you're done:

    ```bash
    deactivate
    ```

## Notes

- Adjust the Bloom filter parameters in the script (`size` and `hash_functions`) based on your specific requirements and data size.
- Remember that Bloom filters provide a probabilistic answer, and false positives are possible.

Happy coding!
